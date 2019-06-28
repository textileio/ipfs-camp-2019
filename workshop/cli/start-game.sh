#!/usr/bin/env bash
ID=${1?param missing - threadId.}

# textile threads get 12D3KooWRhJkorg7tKrp6qUHjrbCVXLYY5juYLyVhC2Wo6ncZyjG

ADDRESS=$(textile account address)

# Get our Thread
if THREAD=$(textile threads get $ID 2>&1); then
    # Only the game creator should start the game
    INITIATOR=$(echo $THREAD | jq -r .initiator)
    # Is current user the game creator?
    if [ ! "$INITIATOR" == "$ADDRESS" ]; then
      echo "Error: Only game creator can start the game."
      exit
    fi

    # Get all existing blocks created by current user
    for row in $( textile file list thread $ID -l100000 | jq  --arg ADDRESS "$ADDRESS" -r '.items[] | select(.user.address == $ADDRESS) | .files[0].file.hash' ); do
      START=$( textile file get $row --content | jq 'select(.event == "start")')

      # If we got any results back from Start events, we can skip creating it again
      if [ ! -z "$START" ]; then
        echo "Game on!"
        exit
      fi

    done

    # If game isn't started, let's kick it off!
    START='{ "event": "start", "target": "'$ADDRESS'" }'
    echo $START | jq '.' | textile file add $ID
    echo "Game started! Tag you're it!"


else
  echo "Error; Incorrect thread ID"
fi
