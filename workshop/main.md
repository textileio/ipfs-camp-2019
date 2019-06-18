---
theme: "white"
transition: "slide"
highlightTheme: "vs"
---

<link rel="stylesheet" href="./override.css"/>

<!-- .slide: data-background-image="https://docs.textile.io/images/home.png" data-background-opacity="0.5" -->

## Building DApps with **Textile**, the iCloud for the DWeb

---

## Welcome!

![](https://docs.textile.io/images/hand.png)

Placeholder Image

note:
  The goal of this workshop is to introduce you to tools and techniques to facilitate building real-world apps and libraries on top of IPFS.
  We'll do this through the lens of real app development, starting with a simple p2p game/example.
  We'll use Textile developer tools to do this, and we'll cover core concepts such as *structured data and schemas*, *decentralized database handling via threads*, *identity*, *contacts, and peers*, and a bunch of social interactions such as *likes, comments, and sharing*.

--

## Textile

### ...a set of tools and trust-less infrastructure for building censorship resistant and privacy preserving applications

note:
  - Speaking of Textile... Textile provides encrypted, recoverable, schema-based, and cross-application data storage built on IPFS and libp2p. While interoperable with the whole IPFS peer-to-peer network, Textile-flavored peers represent an additional layer or sub-network of users, applications, and services.
  - Along with that network, comes a bunch of developer tools that make building working dapps much easier, so that's what we'll be playing with today.

--

## Instructors

![](https://avatars2.githubusercontent.com/u/1220613?s=300)
![](https://avatars2.githubusercontent.com/u/370259?s=300)
![](https://avatars0.githubusercontent.com/u/61148?s=300)

**Carson | Andrew | Benjamin**

Sander | Aaron | Thomas

note:
  - Our team today includes about half of Textile, so if anything goes wrong during the session, remember that it's the *other half's* fault, not ours ;) I think the way we're going to do this, is that I'll go through the session with you all, and Andrew and Ben will be available to troubleshoot, answer questions, and correct me when I make mistakes...
  - I'm Carson Farmer, and I've been with Textile since the start, mostly building tools, writing about IPFS and Textile, developing training materials, and working on some new Javascript tools. I've written a lot about building tools with IPFS,
  - And Andrew...
  - ANd Ben...

---

## Outline

- Split into two parts, with **break** in the middle
  - First half is **conceptual**/theoretical
  - Second half is **practical**

note:
  - We're going to split the session into two parts, with a break in the middle to let you stretch your legs, ask us questions, grab coffee, discretely leave without us noticing, whatever.
  - The first half is going to be pretty conceptual, and will involve demos, examples, and probably lots of questions. 
  - The second half is going to be much more hands on, we'll get you to install some things, run some command-line tools, play some tag, etc.
  - We're going to assume *some* knowledge of IPFS and DWeb concepts in general. Some development experience, though not necessarily mobile or DApps. A working laptop with a modern development setup (Nodejs, React, or even iOS-Xcode would be great). That's about it.

--

## Structure

1. Demo & initial setup
2. Anatomy of a game/dapp
3. Break & questions
4. Hands on fun/command-line
5. Wrap-up & discussion

note:
  - The session will follow this general structure mostly. With a fun demo (which some of you might have already been exposed to), explore the anatomy of our little game dapp, cover some dweb and IPFS-related concepts, then we'll break, and jump into the hands-on component. Here's where you'll actually start to see how things like structured data, threads, p2p communication, etc is used to enhance the user experience.
  - Then we'll finish with a bit of a wrap-up discussion/post-mortem of the session, where we can touch on possible extensions, alternatives, ideas, collaborations, etc.
  - By the end of the session, if we're done our job, and you've done yours, we'll have a) dissected a working dapp, explored its underlying infrastructure, and maybe even written a few lines of code. We'll also touch on mobile app development a *little* bit, but ultimately 1hr is only enough time to give you a *taste* of building dapps with Textile and IPFS.

---

## Demo!

![](https://docs.textile.io/images/mobile.png)

note:
  - Andrew to go through demo of mobile Game of Tag app. He'll do a demo, and describe what is happening as he goes. At the same time, we'll demo the leader-board app, to showcase multiple apps using the same data.

---

## Anatomy of a game

[![](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/861a9f70-42dc-4b81-aed7-047e193633d6/d2svhoj-4f8564c9-f806-4187-8340-78acb11e6e90.jpg/v1/fill/w_900,h_637,q_75,strp/art_meats_technology_by_madspeitersen_d2svhoj-fullview.jpg) <!-- .element: style="height:500px" -->](https://www.deviantart.com/madspeitersen/gallery/)

--

## Games are about fun

- Only a **few things** needed for IPFS Tag...
  - Way to uniquely identify peers
  - Set of rules and (logically centralized) game environment
  - Means of communicating actions (i.e. *tagging*) and tracking (i.e. *who’s it*)
  - Simple user interface

--

## Fun with Textile

- Textile-based dapps meet requirements with some basic [concepts](https://docs.textile.io/a-tour-of-textile/#concepts)...
  - *Identifying peers* done via data [wallets](https://docs.textile.io/concepts/the-wallet/) & [accounts](https://docs.textile.io/concepts/the-wallet/#accounts)
  - *Rules* & *game environment* are defined using [schemas](https://docs.textile.io/concepts/threads/files/#schemas)
  - *Communication* & *score-keeping* done via [threads](https://docs.textile.io/concepts/threads/)
  - User interface provided via client libraries
    - Today we’ll play with [cmdline](https://docs.textile.io/develop/clients/command-line/) and [javascript](https://docs.textile.io/develop/clients/javascript/)

--

<!-- .slide: data-background-image="https://docs.textile.io/images/net.png" data-background-size="contain" -->


note:
  - Textile peers use p2p messaging patterns to orchestrate shared datasets, or more specifically your chats, contacts, albums, and more. With iCloud or another major cloud provider, you expect these datasets to be synced across your devices. Additionally, if you've shared a dataset like a playlist or photo album with other users, you would expect changes to be synced with their devices as well. You can expect the same with Textile, but without the centralized control of a single organization or government.
  - MORE PLEASE

---

## Games are about people

![](https://docs.textile.io/images/friends.png)

--

## The wallet

![](https://docs.textile.io/images/wallet.png)

note:
  - Textile uses a hierarchical deterministic (HD) wallet to derive account keys from a set of unique words, called a mnemonic phrase.
  - Every account seed "inside" the wallet can be derived from this mnemonic phrase. Meaning that the wallet effectively *is* the mnemonic phrase. Any given wallet may create an arbitrary number of accounts. For example, a single wallet can be used to provision multiple Textile Photos "accounts", each with a completely different persona. This provides a powerful partitioning framework.
  - Textile account seeds (private keys) always start with an "S" for "secret" and account addresses (public keys) always start with a "P" for "public".
  - The actual implementation is a BIP32 Hierarchical Deterministic Wallet based on Stellar's implementation of SLIP-0010.

--

## Accounts

![](https://docs.textile.io/images/fingerprint.png)

Placeholder Image

note:
  - Account seeds and their public addresses are generated via the wallet pass-phrase. Textile uses ed25519 keys, which is public-key signature system with several attractive features like fast key generation, signing, and verification. These properties become important on less powerful devices like phones.
  - Account seeds are used to provision new Textile peers. For example, a mobile peer, a desktop peer (like we'll be doing today), etc. Individual peers are tied to a single IPFS instance.
  - Peers that are backed by the same account are called account peers. Account peers will automatically stay in sync. They are able to instruct one another to create and delete threads. Additionally, they will continuously search the network for each other's encrypted thread snapshots (metadata and the latest update hash, usually stored by cafes).
  - Accounts can *also* have profiles, like any standard web 2.0 account. These profiles are self-sovereign, and can include an avatar, display name, and soon even external verified credentials.

---

## Games are about connections

![](https://docs.textile.io/images/home.png)

--

## Threads

- Decentralized database layer that supports...
  - Replication (*who’s it?*)
  - p2p updates (*tag you’re it!*)
  - Conflict resolution (*no, you’re it!*)
  - Queries (*wait, who's it?*)
  - Access controls (*can I play too?*)
  - Offline edits, and more...

--

## Background

note:
  - Threads are the backbone of Textile's encrypted, recoverable, schema-based, and cross-application data storage. Think of a thread as a decentralized database of encrypted files and messages, shared between specific participants.
  - At the core of every thread is a secret. Only peers that possess the secret can decrypt thread content or follow linkages.
  - Unlike a blockchain, threads are not based around the idea of consensus. Instead, they follow an agent-centric approach similar to holochain. Each peer has authority over thread access-control and storage.
  - Because threads are simply a hash-chain of update messages, or blocks, they can represent any type of dataset. Some blocks point to off-chain data stored on IPFS. For example, a set of photos, a PDF, or even a tag event. 
  - Application developers are able to add structure to threads and make them interoperable with other applications by using schemas (more on this in a bit).
  - Threads are auto-magically synced with other account peers. For example, you may have one peer on your phone, and another on your laptop, both with access to the same account seed (which we talked about earlier).
  - Threads can *also* be shared with other non-account peers (other users).
  - In each case, each peer maintains a copy of its threads. A p2p messaging protocol keeps all the copies in sync.
  - The special hash-chain or graph structure of a thread allows them to be easily shared with other peers and backed-up to cafes. Given one message, you can find all the others.

--

## Requirements

note:
  - Threads are supposed to serve a decentralized cloud-like function for safely storing and retrieving data generated by applications for users, i.e., photos, messages, contacts, tag events, etc. They were designed with the following requirements in mind:
    - Conflict resistant: Similar to ipfs-log, a thread should facilitate a resilient, distributed state, shared among multiple members (and/or devices).
    - Mud puddle resistant: There should be a way to safely backup a thread's state such that the owner can recover it.
    - Offline-first: Because most people access the internet primarily from mobile devices, threads must enable a UX that works well in scenarios where connectivity is spotty, and peers are continually coming and going from the network.
    - Secure: Peers must sign updates and encrypted with the shared key. Ideally, linkages should also be obscured by encryption.
    - On the one hand, threads are a data model for representing a dataset as a hash-chain of updates. On the other hand, it's a protocol for orchestrating that state between peers.
    - Threads aim to be language and platform agnostic. For this reason, Textile uses protocol buffers extensively because they are a "language-neutral, platform-neutral, extensible mechanism for serializing structured data".

--

## Access Control

note:
  - Control over thread access and sharing is handled by a combination of the type and sharing settings.
  - An immutable member address "whitelist" gives the initiator fine-grained control. An empty whitelist is taken to be "everyone", which is the default.
  - Threads also support general access control in the form of 'private', 'read-only', 'public', and 'open' threads.
  - Similarly, inviting new members to a thread can be controlled via sharing control, with options for 'not sharable', 'invite only', or 'shared'.

--

## Blocks

note:
  - Blocks are the raw components of a thread. Think of them as an append-only log of thread updates where each one is hash-linked to its parent(s), forming a tree. New / recovering peers can sync history by merely traversing the hash tree.
  - In practice, blocks are small (encrypted) protocol buffers, linked together by their IPFS CID (content id or hash).
  - There are several block types:
    - MERGE:    3-way merge added.
    -  IGNORE:   A block was ignored.
    -  FLAG:     A block was flagged.
    -  JOIN:     Peer joined.
    -  ANNOUNCE: Peer set username / avatar / inbox addresses
    -  LEAVE:    Peer left.
    -  TEXT:     Text message added.
    -  FILES:    File(s) added.
    -  COMMENT:  Comment added to another block.
    -  LIKE:     Like added to another block.
  - The orchestration of thread state between peers can be thought of as syncing a graph of blocks and files, which involves sending outbound updates and reading inbound updates. In practice, this is handled by a libp2p service.

--

## Files

note:
  - Any data added to a thread ends up as a file. Most of the time, a schema is used to define one or more types of data in a thread such that other users and applications can understand it.
  - Thread data is built into an IPLD merkle DAG structure (similar to a merkle tree) and stored separately from update blocks on IPFS. A FILES block points to the top-level hash of a file's DAG node. The actual structure of files DAG nodes are determined by, and validated against, a schema, which is where our game gets it's rules...

---

## Games are about rules

![](https://docs.textile.io/images/friends.png)

Placeholder Image

--

## Schemas

```json
{
  "name": "media",
  "pin": true,
  "links": {
    "large": {
      "use": ":file",
      "mill": "/image/resize",
      "opts": {
        "width": "800",
        "quality": "80"
      }
    },
    "small": {
     "use": ":file",
      "mill": "/image/resize",
      "opts": {
        "width": "320",
        "quality": "80"
      }
    },
    "thumb": {
      "use": "large",
      "pin": true,
      "mill": "/image/resize",
      "opts": {
        "width": "100",
        "quality": "80"
      }
    }
  }
}
``` 

note:
  - A thread can have only one schema. It has two main functions:
    - Define a Thread's data DAG structure
    - Define the order of mills (transforms) needed to produce this structure from the input
  - To illustrate these functions, take a look at the builtin media schema. Each link (large, small, thumb) produces a resized and encrypted image by leveraging the image/resize mill.
  - Notice that the thumb link uses the large as input. This means that large will need to milled (that's what we call a transform function) before thumb.
  - Once you understand how schemas and mills work, you can design complex workflows and structures for your applications.

--

## Mills

note:
  - The meta and content node pairs in a files DAG (which we'll see in a moment) are generated by file mills. Mills serve three distinct purposes:
    -  Validate the input against accepted media types. The JSON mill will also validate the input against a JSON Schema.
    - Transform the input data, e.g., encode, resample, encrypt, etc.
    - Index a metadata object (JSON) describing the transformed output. This allows thread content to be efficiently queried and provides a mechanism for de-duplicating encrypted data.

--

![](https://docs.textile.io/images/files.png)

note:
  - In addition to the transformed bytes, a mill will produce a file metadata object for every input.
  - File metadata objects are what most applications will interact with. They are the objects listed by the Files and Feed APIs. These objects are also used internally for various functions. For example, because good encryption is not deterministic, an input's checksum is used to de-duplicate encrypted data.
  - At this point, it should be clear that adding data to a thread results in a DAG defined by a schema. But how exactly is the data stored so as to be programmatically accessible to thread consumers? Let's take a closer look at the DAG produced by the builtin media schema...
  - Note that a files target is by default a directory of indexes (0, 1, etc.). This mean that you can add an entire folder of images (or whatever your data is) with a single update.
  - Also, each link (large, small, etc.) will always have the special meta and content sub-links, which correspond to the (usually encrypted) file metadata and content.

--

## File Indexes

```json
{
    "links": {
        "large": {
            "mill": "/image/resize",
            "checksum": "EqkWwbMQoSosYnu85XHpdTsM3NDKTRPk5j4RQjN6c4FZ",
            "source": "D4QdxGCAFnGwCHAQxrros1V6zEf78N4ugK3GwZyT5dTJ",
            "opts": "21uBAuSeQUdw5aDu5CYPxEfeiLVeuvku1T26nWtJC84C",
            "hash": "QmcvoHe333KRf3tfNKrtrM7aMUVnrB4b1JyzhSFybepvqQ",
            "key": "6cCnusZVHwp6udnKv3eYhurHK6ArJyFxCYRWTUFG8ZuMwSDwVbis9FUX3GRs",
            "media": "image/jpeg",
            "name": "clyde.jpg",
            "size": "84222",
            "added": "2019-03-17T01:20:17.061749Z",
            "meta": {
                    "height": 600,
                    "width": 800
                },
            "targets": [
                "QmPngweFQ9VUhjtyy8nfJRZ8us9UFbS6Y2trwmAswfJ2yk"
            ]
        },
        "small": {
            "mill": "/image/resize",
            "checksum": "7Gu5s6sZkwU8UQWwJNnJSrVY75ZkQG4bpQSwQPwkk8aX",
            "source": "D4QdxGCAFnGwCHAQxrros1V6zEf78N4ugK3GwZyT5dTJ",
            "opts": "CassDcqf192MnceweJKGJvhZfrV9kB3GJRbvNPWm6raa",
            "hash": "QmZuD522rQiFE2GdbNXvzcQ3Ci6aLvvJtWz52a97iEDy9G",
            "key": "29ce4pg64Lj78GuTauQDxeqpfdNCF7fNsJauS552wfpkEjegq8kQgwiNAzJQZ",
            "media": "image/jpeg",
            "name": "clyde.jpg",
            "size": "18145",
            "added": "2019-03-17T01:20:14.739531Z",
            "meta": {
                    "height": 240,
                    "width": 320
                },
            "targets": [
                "QmPngweFQ9VUhjtyy8nfJRZ8us9UFbS6Y2trwmAswfJ2yk"
            ]
        },
        "thumb": {
            "mill": "/image/resize",
            "checksum": "GzB1CWKkKQ5sWS8qQXDoBZxsfFgsgZwD9Z51qX5d7LGW",
            "source": "EqkWwbMQoSosYnu85XHpdTsM3NDKTRPk5j4RQjN6c4FZ",
            "opts": "7aGVJ7nGgmHdqv8oiEKZ2ZbrNBv1zVP3ADSuT2sW3MwT",
            "hash": "QmUuXPhrtLJUzfuoJu7BkfiB2mGfKwq4ExTTF8gVUvAh2U",
            "key": "KfW8nTEZqh1NbAcmB51DMaooe34ujucx2DMqBwiz4xs9sDVhNDYNPratgtbf",
            "media": "image/jpeg",
            "name": "clyde.jpg",
            "size": "2979",
            "added": "2019-03-17T01:20:17.133863Z",
            "meta": {
                    "height": 75,
                    "width": 100
                },
            "targets": [
                "QmPngweFQ9VUhjtyy8nfJRZ8us9UFbS6Y2trwmAswfJ2yk"
            ]
        }
    }
}
```

note:
  - This is a JSON representation of file indexes from a single image corresponding to say, file 0 from the previous slide.

--

## Summary

note:
  - Schemas are used to create and validate the structure of thread files, defining their type and purpose for consumers (users and applications). For example, a photos application may create photo-based threads, a health application my create threads with medical records, a tag game may create a thread for tag events, etc.
  - By treating schemas as first-class citizens, other applications are also able to understand and make use of these threads. We're going to see an example of this a little bit later, where two different apps will leverage the same underlying thread data.
  - In practice, schemas have three distinct roles:
    - Provide instructions for how to transform or "mill" an input, e.g., given a photo, create three different sizes and discard the raw input (this is the media schema).
    - Define whether or not the resulting DAG nodes should be stored (pinned) on account peers.
    - Validate thread files from other participants, applying the same storage rules as in (2).
  - The structure of a schema maps closely to the DAG nodes it creates. Highly complex nodes can be specified with dependencies between each link. A peer will automatically sort this 'graph' of dependencies (using topological sorting) into a series of "steps". Each step is handled by a mill.

---

## Games are meant to be played

![](https://docs.textile.io/images/friends.png)

Placeholder Image

--

## Setup

- Groups of ~3-4 *by OS*, or cats vs dogs, or ...
- What you'll (definitely) *need*
  - A terminal/bash/whatever
  - [`go-textile` cli tools](https://github.com/textileio/go-textile)
- What you'll (maybe) *want*
  - [**IPFS Tag** mobile app]()
  - Node.js + `npm` tooling

--

## Install

- Download and extract the [latest release](https://github.com/textileio/go-textile/releases/latest) for your OS and architecture (or use `wget` etc...)
- macOS and Linux
  - Extract the tarball (manually or via...)
  ```
  👩‍💻 tar xvfz go-textile_0.4.0_{os}-amd64.tar.gz`)
  ```
  - Move `textile` anyplace in your `PATH` (or via...)
  ```
  👨‍💻 ./install
  ```
- Windows
  - Extract the zip file and move `textile.exe` anyplace in your `PATH`

--

## Extras

1. https://github.com/textileio/ipfs-camp
2. Clone the repo
```
👩‍💻 git clone https://github.com/textileio/ipfs-camp
👨‍💻 cd ipfs-camp
```
3. Get ready to play around...

---

## Break!

![](https://docs.textile.io/images/friends.png)

Placeholder Image

---

## Let's Play

![](https://docs.textile.io/images/friends.png)

Placeholder Image

--

## Start

```bash
👩‍💻 textile wallet create
```
```bash
--------------------------------------------------------
| xxxx xxxx xxx xxx xxxx xxxx xxx xxx xxx xxxx xxx xxx |
--------------------------------------------------------
WARNING! Store these words above in a safe place!
WARNING! If you lose your words, you will lose access to data in all derived accounts!
WARNING! Anyone who has access to these words can access your wallet accounts!

Use: `wallet accounts` command to inspect more accounts.

--- ACCOUNT 0 ---
Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Sxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
<!-- .element: class="output" -->

note:
  - All desktop and server peers run as a daemon, which contains an embedded IPFS node. Much like the IPFS daemon, the program (textile) ships with a command-line client.
  - Assuming you now have textile available on your system, you can run your own peer. But first, we need to create a new wallet.
  - As previously mentioned, Textile uses a hierarchical deterministic (HD) wallet to derive account keys from a set of unique words, called a mnemonic phrase.
  - You can initialize one of these wallets with the command-line client (this will not persist anything to your filesystem).
  - The output contains information about the wallet's first account, or the keys at index 0. Account seeds (private keys) always starts with an "S" for "secret" and account addresses (public keys) always start with a "P" for "public".
  - Most users will only be interested in the first account keys, but you can access deeper indexes with the accounts sub-command. You can try `textile wallet accounts --help` for details on that.

--

## Init + Run

```bash
👨‍💻 textile init Sxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
```bash
Initialized account with address Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
<!-- .element: class="output" -->

```bash
👩‍💻 textile daemon
```
```bash
go-textile version: vx.x.x
Repo version: xx
Repo path: /path/to/.textile/repo
API address: 127.0.0.1:40600
Gateway address: 127.0.0.1:5050
System version: amd64/{darwin,linux,windows}
Golang version: go1.12.x
PeerID:  12D3Kxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Account: Pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
<!-- .element: class="output" -->

note:
  - Next, use an account seed from your wallet to initialize a new account peer. Here, we just grab the account seed from the first account above
  - There are a dozen or so additional options that are available when initializing, you can find them all via  `textile init --help`.
  - Anyone familiar with IPFS will recognize the similarities with these steps. Much like `ipfs init`, `textile init` creates an IPFS node repository on disk.
  - Now that you have initialized as either an account peer or a cafe peer, you can finally start the daemon.
  - Again, see `textile daemon --help` for more options.
  - Now your Textile peer is online and ready to start interacting with data on IPFS.

--

## Profile

```bash
👨‍💻 textile profile get
```
```
{
    "id": "12D3KooWCMVLfMV8uzYpFN38qn2eMs48tAuHdVZdj3aF6nex6zay",
    "address": "P8wW5FYs2ANDan2DV8D45XWKtFFYNTMY8RgLCRcQHjyPZe5j",
    "created": "2019-04-19T21:44:46.310082Z",
    "updated": "2019-04-19T21:44:46.310082Z"
}
```
<!-- .element: class="output" -->
```bash
👩‍💻 textile profile set --name="Carson"
```
```
ok
```
<!-- .element: class="output" -->
```bash
👨‍💻 textile profile set --avatar="path/to/an/image"
```
```
ok
```
<!-- .element: class="output" -->

note:
  - Now, with Textile ready, take a look at your peer profile.
  - You'll see your `id`, which is your embedded IPFS node's peer ID, and your `address` which is your wallet account's address (public key), which can be shared with other account peers or users.
  - In addition to these computer readable names, you can set a display name for your peer. Interacting with other users is a lot easier with display names. However, they are not unique on the network.
  - Similarly, you can assign your peer a publicly visible avatar image.
  - Go ahead and do both of these things now, pick an image you don't mind being public, and a name that will help your peers know who you are when playing tag.

--

## Account

```bash
👩‍💻 textile account get
```
```
{
    "address": "Pxxx",
    "name": "Carson",
    "avatar": "Qmhash",
    "peers": [
        {
            "id": "12D3Kxxx",
            "address": "Pxxx",
            "name": "Carson",
            "avatar": "Qmhash",
            "created": "2019-04-19T21:44:46.310082Z",
            "updated": "2019-04-20T00:31:34.699845Z"
        }
    ]
}
```
<!-- .element: class="output" -->

note: 
  - Generally speaking, you can think of peers as ephemeral agents owned by your account. You may lose your device and/or need to access your account on a new one.
  - All peers have a special private *account* thread. In addition to avatars, this thread keeps track of your account peers.
  - You can take a look at your account any time, and as new peers are added, they'll be reflected here.
  - Just one peer so far. This object is actually a contact. We'll come back to contacts later.
  - You can also do other things with your account, such as view your account seed, sync your account with the network, etc. See `textile account --help` for details.

--

## Threads

```
{
    "name": "blob",
    "pin": true,
    "mill": "/blob"
}
```

note: 
  - Ok, time to get serious. Let's create a basic thread to start exploring how we'd connect peers within a game of tag.
  - A thread can track data if it was created with a schema. The most basic schema is the built-in pass-through, or 'blob' schema, which looks like this.
  - If you recall from before the break, thread schemas are DAG schemas that contain steps to create each node. "blob" defines a single top-level DAG node without any links. We'll get to more complex schemas in a moment. The `pin` key instructs the peer to locally pin the entire DAG node when it's created from the input. And the `mill` entry defines the function used to process (or "mill") the data on arrival. `/blob` is a pass-through, meaning that the data comes out untouched.

--

```bash
👨‍💻 textile threads add "Name" --blob --key="ipfs.camp.tag" 
```
```
{
    "block_count": 1,
    "head": "Qmhash",
    "head_block": {
        "author": "12D3Kxxx",
        "date": "2019-06-14T21:55:44.358843Z",
        "id": "Qmhash",
        "parents": [],
        "thread": "12D3Kxxx",
        "type": "JOIN",
        "user": {
            "address": "Pxxxx",
            "name": "carson"
        }
    },
    "id": "12D3Kxxxx",
    "initiator": "Pxxxx",
    "key": "ipfs.camp.tag",
    "name": "Name",
    "peer_count": 1,
    "schema": "Qmhash",
    "schema_node": {
        "mill": "/blob",
        "name": "blob",
        "pin": true
    },
    "sk": "xxx",
    "state": "LOADED",
    "whitelist": []
}
```
<!-- .element: class="output" -->

note:
  - We can create a thread with this schema using the --blob flag. This is about as basic as we can get, a pass-through schema with all the default access controls.
  - There are also other built-in schemas that you can use in your own applications, and lots of options to control who can access the data. See `textile threads --help` for details.
  - If you run that command, your output should show some metadata about the thread you just created, with a reference to the "HEAD" (latest) update block. At this point, this is also the only block, which indicates that your peer joined the thread.

--

## Data

```bash
👩‍💻 echo "mmm, bytes..." | textile files add <thread-id>
```
```
{
    "block": "Qmhash",
    "target": "Qmhash",
    "date": "2019-06-14T21:58:14.375745Z",
    "user": {
        "address": "Pxxx",
        "name": "carson"
    },
    "files": [
        {
            "file": {
                "mill": "/blob",
                "checksum": "xxx",
                "source": "xxx",
                "opts": "xxx",
                "hash": "Qmhash",
                "key": "xxx",
                "media": "text/plain; charset=utf-8",
                "name": "stdin",
                "size": "14",
                "added": "2019-06-14T21:58:13.931503Z",
                "meta": {
                    },
                "targets": [
                    "Qmhash"
                ]
            }
        }
    ],
    "comments": [
    ],
    "likes": [
    ],
    "threads": [
        "12D3Kxxx"
    ]
}
```
<!-- .element: class="output" -->

note: 
  - Let's add some data to our thread. Be sure to use your own thread ID. We'll start with some basic text data, added as a raw 'blob' of data.
  - Any data added to a thread ends up as a 'file', regardless of whether or not the source data was an actual file. For example, here we're echoing a string into a thread, which results in a new "file" object containing that string.
  - What we get back is a new thread 'block', with information about the block itself, who created it, creation date/time, etc.
  - The 'files' array contains a list of file metadata objects. In this case, a list of one.
  - File metadata objects are what most applications will interact with. They are the objects listed by the Files and Feed APIs, which we'll talk about in a bit. These objects are also used internally for various functions. For example, because good encryption is not deterministic, an input's checksum is used to de-duplicate encrypted data.

--

## Encryption

```
textile files keys Qmahash
```
```
{
    "files": {
        "/0/": "xxx"
    }
}
```

note:
  - Speaking of encryption, unless a schema step specifies "plaintext": true (which we didn't have in our blob schema), the value of meta and content are both encrypted with the Advanced Encryption Standard (AES) using their very own symmetric key. We can view the keys for each node in the DAG using the keys command.

--

## DAGs

![](https://docs.textile.io/images/blob.png)

Note:
  - At this point, it should be clear that adding data to a thread results in a DAG defined by a schema. But how exactly is the data stored so as to be programmatically accessible to thread consumers? Let's take a closer look at the DAG produced by our built-in blob schema...
  - Note that a files target is by default a directory of indexes (0, 1, etc.). This mean that you can add an entire 'folder' of data (images, tag events, whatever) with a single update.
  - Also, every schema step will always have the special meta and content sub-links, which correspond to the (usually encrypted) file metadata and content.
  - In this case, we only have a single 'step', but our built-in media schema (which is what we use in Textile Photos) has a much more complicated structure:

--

## Media

![](https://docs.textile.io/images/files.png)

note:
  - We won't dwell on this example too much, because now its time to start playing tag.

--

## Rules

```json
{
    "name": "cmd-line-tag",
    "mill": "/json",
    "plaintext": true,
    "json_schema": {
        "title": "CMD Line Tag Mechanics",
        "description": "Possible events in cmd line tag.",
        "type": "object",
        "required": [ "event" ],
        "properties": {
            "event": {
                "type": "string",
                "description": "event type identifier"
            },
            "target": {
                "type": "string",
                "description": "peer-id of that the event modifies"
            },
            "extra": {
                "type": "string",
                "description": "extra information"
            }
        }
    }
}
```

note:
  - Let's go through one more thread use case that demonstrates how to create a custom DAG schema. We'll make use of a custom JSON schema for tracking JSON documents.
  - Make a file called `tag.json`, with the following content (or use the existing one in the repo you clone earlier).
  - Notice the special 'json_schema' key. This is where you can specify the custom JSON-based schema that your thread updates must satisfy. The really cool thing here is that Textile threads support json-schema.org schemas out of the box. So you can specify pretty complicated workflows and required properties, ensuring your app behaves exactly the way you're expecting it to. Validation in done client side, so there's no required intermediate server at any point along the way.
  - In this case, we have one required property, event, just to show you some features of json-schema.org. I highly recommend you check it out for more details.

--

## Schemas

```bash
textile threads add "Tag" --schema-file=/path/to/tag.json --type="public" --sharing="invite_only"
```

note:
  - So to utilize our custom schema, we'll simply create a new thread, this time specifying the custom json document we just created

--

## Adding

```bash
echo '{ "event": "tag", "target": "'<peer-id>'" }' | textile files add <thread-id>
```

note:
  - Then, to actually *use* our new thread, we simply add some json data...
  - Your peer will validate the input against the thread's schema. The input will also be validated against its embedded JSON schema (schemas within schemas!).
  - Upon success, you'll get back a nicely formatted block update.
  - You can try adding an update _without_ the event key, which is invalid. This should result in a error. This is handy, because it means your app peers won't corrupt a thread with invalid data, ever.

--

## Friends

```bash
textile invite create <thread-id> --address=<neighbor-peer-id>
```

note:
- Tag is going to be pretty boring if we don't have some friends to play with... Textile has several ways to handle this.
- The most useful, is to create an invite to your game thread, and invite other Textile peers. Those other peers can then ‘accept or add’ the invite to join your game, or of course, they could create their own game and corresponding invite.
- So let's share our thread with another user. It was created with type, "open", meaning that other members will be able to read thread updates, *and* add new updates. In other words, our threads will be writable by all members.
- Let's try something here, turn to the nearest person or group of people following along, and exchange peer ids. You can email, text, share a piece of paper, use textile photos, or ...
- Next, let's create a direct p2p invite to invite that peer to our thread. Alternatively, you could create an external thread invite, which would include the thread key by leaving off the address .
- This is slightly less secure, in that you need to send along a key, but can be done reasonably safely by using a secure channel such as e2e encrypted chat, encrypted email, or even qr codes a physical proximity. Obviously if you don't care about privacy (for example, its an open thread, then could just post the thread id and key somewhere for everyone to access)

---

## Messages

```bash
👩‍💻 textile messages add -t <thread-id> "game on"
```
```
{
    "block": "Qmhash",
    "body": "Game on",
    "comments": [],
    "date": "2019-06-14T21:37:37.053367Z",
    "likes": [],
    "user": {
        "address": "Pxxx",
        "name": "carson"
    }
}
```
<!-- .element: class="output" -->

note:
  - A big part of tag is actually verbal communication. "Na na, you can't catch me!" and other taunts are *part* of the game. Our p2p tag game is no different.
  - With Textile, any thread can take a plain old text message. Later, we'll use these within the game to communicate (you can even use it after this session to communicate with folks at the conference). Be sure to replace the thread parameter with the ID of the thread you generated in the last step.

--

--

## Explore

- List thread blocks
- List contacts
- Add messages
- Add data

--

## Query

- Feed API
- Observe API

---



# Contact

![](https://docs.textile.io/images/contact.png)

---



-->