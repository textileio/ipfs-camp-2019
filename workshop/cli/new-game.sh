#!/usr/bin/env bash
set -e # abort on any error

NAME=${1?param missing - name.}

KEY='textile-cmd-line-tag-v0.0-'${NAME// /_}

if result=$(textile threads add $NAME --key=$KEY --schema-file='game-of-tag.json' --type="open" --sharing="invite_only" 2>&1); then
    RESULT=$result
else
  echo $result

  # Print any existing threads with this name
  echo "Known threads:"
  textile threads list | jq --arg KEY "$KEY" '.items[] | select(.key == $KEY)'

  echo "hint: game names must be unique"
  exit
fi

jq '.' <<< $RESULT
