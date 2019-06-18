# Setup a new game of cmd-line tag!

## Create a new game

sh new-game.sh <unique name>

```sh
sh new-game.sh "Game 1"
```

## Output

```json
{
  "block_count": 1,
  "head": "Qmhash",
  "head_block": {
    "author": "12D3Kxxx",
    "date": "2019-06-10T20:20:42.195264Z",
    "id": "Qmhash",
    "parents": [],
    "thread": "12D3Kxxx",
    "type": "JOIN",
    "user": {
      "address": "Pxxx",
      "name": "xxx"
    }
  },
  "id": "12D3Kxxx",
  "initiator": "Pxxx",
  "key": "textile-cmd-line-tag-v0.0-game_1",
  "name": "Game 1",
  "peer_count": 1,
  "schema": "Qmhash",
  "schema_node": {
    "json_schema": {
      "description": "Possible events in cmd line tag.",
      "properties": {
        "event": {
          "description": "event type identifier",
          "type": "string"
        },
        "extra": {
          "description": "extra information",
          "type": "string"
        },
        "target": {
          "description": "peer-id of that the event modifies",
          "type": "string"
        }
      },
      "required": [
        "event"
      ],
      "title": "CMD Line Tag Mechanics",
      "type": "object"
    },
    "mill": "/json",
    "name": "cmd-line-tag"
  },
  "sharing": "INVITE_ONLY",
  "sk": "xxx",
  "state": "LOADED",
  "type": "PUBLIC",
  "whitelist": []
}

```

## Invite a peer


```sh
textile invites create --thread="12D3Kxxx" --address="Pxxx"
```

## List peers

```sh
textile thread peer -t 12D3Kxxx
```

## Start the game

```sh
sh start-game.sh
```

## Tag the new peer

sh tag-peer.sh <thread id> <peer address>

```sh
sh tag-peer.sh 12D3Kxxx Pxxx
```

## Are you it?

sh am-i-it.sh <thread id>

```sh
sh am-i-it.sh 12D3Kxxx
```

```sh
1. -carson- tagged you
2. you tagged -carson-

Run! -carson- is it!
```
