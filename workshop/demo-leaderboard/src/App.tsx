import React, { Component } from 'react';
import { Header, Grid } from 'semantic-ui-react';
import Textile, { FeedItemList, ContactList, FeedItem, ThreadList } from '@textile/js-http-client'
import FeedList from './FeedList';
import PeerList from './PeerList';
import JoinModal from './JoinModal';
import MessageForm from './MessageForm';
import './App.css';

type AppState = {
  feed?: FeedItemList,
  peers?: ContactList,
  thread?: string,
  threadList?: ThreadList,
  current?: string
};

type EventType = {
  event: string, // Event type identifier
  target?: string // Address of peer the event affects
  extra?: string // Extra information
}

function readFileAsync(file: Blob): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  })
}

export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      feed: undefined,
      peers: undefined,
      thread: undefined
    }
  }
  handleTag = async (address: string) => {
    if (this.state.thread) {
      try {
        Textile.files.add({ event: 'tag', target: address }, 'tag', this.state.thread)
      } catch (err) {
        console.log(err)
      }
    }
  }
  handleMessage = async (message: string) => {
    if (this.state.thread) {
      try { 
        Textile.messages.add(this.state.thread, message)
      } catch (err) {
        console.log(err)
      }
    }
  }
  getThreads = async () => {
    try {
      const threadList = await Textile.threads.list()
      this.setState({ threadList })
    } catch (err) {
      console.log(err)
    }
  }
  getPeers = async (thread: string) => {
    try {
      const peers = await Textile.threads.peers(thread)
      const contact = await Textile.account.contact()
      peers.items.unshift(contact)
      this.setState({ peers })
    } catch (err) {
      console.log(err)
    }
  }
  getFeed = async (threadId: string) => {
    try {
      const feed = await Textile.feed.list(threadId, undefined, 1000, 'annotated')
      const thread = await Textile.threads.get(threadId)
      let current = thread.initiator // Default to initiator
      const processed = [...feed.items]
        .reverse()
        .map(async (item: FeedItem) => {
          const type = item.payload['@type']
          switch (type) {
            case '/Files':
              try {
                const content = await Textile.file.content(item.payload.files[0].file.hash)
                const file = await readFileAsync(content)
                const valid = item.payload.user.address === current
                const tagged: EventType = JSON.parse(file as string)
                if (tagged.target) {
                  if (valid) {
                    current = tagged.target
                  }
                  const contact = await Textile.contacts.get(tagged.target)
                  item.payload.info = { // EventType
                    event: 'tag',
                    target: contact.name || contact.address.slice(0, 8),
                    extra: valid ? 'tagged' : 'missed'
                  }
                }
              } catch (err) {
                console.log(err)
              }
              break
            case '/Join':
              item.payload.info = {
                event: 'join',
                target: 'the game',
                extra: 'joined'
              }
              break
            case '/Leave':
              item.payload.info = {
                event: 'leave',
                target: 'the game',
                extra: 'left'
              }
              break
            case '/Text':
              item.payload.info = {
                event: 'message',
                target: item.payload.body,
                extra: 'said'
              }
              break
            default:
              break
          }
          return item
        })
      feed.items = (await Promise.all(processed)).reverse()
      this.setState({ feed, current })
    } catch (err) {
      console.log(err)
    }
  }
  handleThread = (thread: string) => {
    this.setState({ thread })
    this.getPeers(thread)
    this.getFeed(thread)
    // Start listening for real-time events
    try {
      Textile.observe.events(undefined, thread).then((stream) => {
        const reader = stream.getReader()
        const read = (result: ReadableStreamReadResult<FeedItem>) => {
          if (result.done) {
            return
          }
          const type = result.value.payload['@type']
          try {
            switch (type) {
              case '/Join':
              case '/Announce':
              case '/Leave':
                this.getPeers(thread)
              // fall through
              case '/Files':
              case '/Text':
                this.getFeed(thread)
                break
              default:
                break
            }
          } catch (err) {
            reader.cancel(undefined)
            return
          }
          reader.read().then(read)
        }
        reader.read().then(read)
      })
    } catch (err) {
      console.log(err)
    }
  }
  componentWillMount() {
    this.getThreads()
  }
  render() {
    if (this.state.thread) {
      return (
        <div className="App">
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h2">Feed</Header>
                <FeedList feed={this.state.feed} />
                <MessageForm onSubmit={this.handleMessage}/>
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h2">Players</Header>
                <PeerList
                  peers={this.state.peers}
                  onSubmit={this.handleTag}
                  current={this.state.current}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )
    }
    return <JoinModal
      onSubmit={this.handleThread}
      threadList={this.state.threadList ? this.state.threadList.items.map((thread) => {
        return { text: thread.name, value: thread.id }
      }) : []} />
  }
}
