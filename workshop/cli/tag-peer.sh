#!/usr/bin/env bash
set -e # abort on any error

ID=${1?param missing - threadId.}


PEER=${2?param missing - peer.}

ADDRESS=$(textile account address)


if THREAD=$(textile threads get $ID 2>&1); then
  # Only the game creator should start the game
  INITIATOR=$(echo $THREAD | jq -r .initiator)

  TAGGED=$INITIATOR

  KNOWN=$( textile thread peers $ID | jq --arg PEER "$PEER" '.items[] | select(.address == $PEER)')

  # Check if Known is empty
  if [ -z "${KNOWN// }" ]; then
    echo "Error: Peer hasn't joined game yet"
    echo 'hint: textile invites create '$ID' --address="'$PEER'"'
    exit
  fi

  for row in $( textile feed $ID -l1000000 | jq -c '.items | reverse | .[] | select(.payload."@type" == "/Files")' ); do
    # Only the person that is Tagged creates updates we care about
    AUTHOR=$(echo $row | jq -r '.payload.user.address')
    if [ "$AUTHOR" == "$TAGGED" ]; then
      HASH=$(echo $row | jq -r '.payload.files[0].file.hash')
      TAG=$( textile file get $HASH --content | jq 'select(.event == "tag")' )
      # We are just lookking for tag events
      if [ ! -z "${TAG// }" ]; then
        # Hand off the known tagged
        TAGGED=$( textile file get $HASH --content | jq -r '.target' )
      fi
    fi
  done

  if [ ! "$TAGGED" == "$ADDRESS" ]; then
    echo "Error: Sorry, wait your turn."
    exit
  fi

  # All good, make the tag real
  START='{ "event": "tag", "target": "'$PEER'" }'
  echo $START | jq '.' | textile file add "$ID"

  echo "Boom, you've made it to safety"
else
  echo "Error: Incorrect thread ID"
fi
