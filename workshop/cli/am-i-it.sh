#!/usr/bin/env bash
set -e # abort on any error

ID=${1?param missing - threadId.}

# textile threads get 12D3KooWRhJkorg7tKrp6qUHjrbCVXLYY5juYLyVhC2Wo6ncZyjG
ADDRESS=$(textile account address)

if THREAD=$(textile threads get $ID 2>&1); then
  # Only the game creator should start the game
  INITIATOR=$(echo $THREAD | jq -r .initiator)

  # TODO: Should hit the start-game script here to ensure it's started if not

  declare -i STARTED
  STARTED=0
  # Get all existing blocks created by current user
  for row in $( textile file list thread $ID -l100000 | jq  --arg INITIATOR "$INITIATOR" -r '.items[] | select(.user.address == $INITIATOR) | .files[0].file.hash' ); do
    START=$( textile file get $row --content | jq 'select(.event == "start")')
    # If we got any results back from Start events, we can skip creating it again
    if [ ! -z "$START" ]; then
      STARTED+=1
    fi

  done

  if [ "$STARTED" -eq 0 ]; then
    echo "Error: Game not started"
    exit
  fi

  # Game always started with initiator it
  TAGGED=$INITIATOR

  declare -i N
  N=1
  for row in $( textile feed $ID -l 1000000 | jq --unbuffered -cr ".items | reverse | .[] | select(.payload.\"@type\" == \"/Files\") | @base64" ); do
    # Only the person that is Tagged creates updates we care about
    DECODED=$(echo $row | base64 --decode)
    AUTHOR=$(echo $DECODED | jq -r ".payload.user.address")
    if [ "$AUTHOR" == "$TAGGED" ]; then
      HASH=$(echo $DECODED | jq -r '.payload.files[0].file.hash')
      TAG=$( textile file get $HASH --content | jq 'select(.event == "tag")' )
      # We are just lookking for tag events
      if [ ! -z "${TAG// }" ]; then
        NOWIT=$( textile file get $HASH --content | jq -r '.target' )
        if [ $NOWIT == $ADDRESS ]; then
          CONTACT=$(textile contacts get $TAGGED | jq -r '.name')
          echo "$N. $CONTACT tagged you"
        elif [ $TAGGED == $ADDRESS ]; then
          CONTACT=$(textile contacts get $NOWIT | jq -r '.name')
          echo "$N. you tagged $CONTACT"
        else
          CONTACT_A=$(textile contacts get $TAGGED | jq -r '.name')
          CONTACT_B=$(textile contacts get $NOWIT | jq -r '.name')
          echo "$N. $CONTACT_A tagged $CONTACT_B"
        fi
        N+=1
        # Hand off the known tagged
        TAGGED=$NOWIT
      fi
    fi
  done

  echo ""

  if [ $TAGGED == $ADDRESS ]; then
    echo "Oh no, you are it!"
  else
    CONTACT=$(textile contacts get $TAGGED | jq -r '.name')
    echo "Run! $CONTACT is it!"
  fi
else
  echo "Error: Incorrect thread ID"
fi
