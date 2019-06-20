import React, { FunctionComponent } from 'react';
import { Item, Divider, Button } from 'semantic-ui-react';
import { Contact, ContactList } from '@textile/js-http-client';

type PeerProps = {
  contact: Contact,
  onSubmit: (address: string) => Promise<void>,
  it?: boolean
};

type PeerListProps = {
  peers?: ContactList,
  current?: string,
  onSubmit: (address: string) => Promise<void>
}

const defaultImg = 'https://react.semantic-ui.com/images/wireframe/image.png';

const Peer: FunctionComponent<PeerProps> = (props) => {
  const { contact, onSubmit, it } = props
  const avatar = contact.avatar
    ? `http://127.0.0.1:5050/ipfs/${contact.avatar}/0/large/content`
    : defaultImg
  return (
    <Item>
      <Item.Image size='tiny' src={avatar} />
      <Item.Content verticalAlign='middle'>
        <Item.Header style={{ color: it ? 'red' : 'inherit' }}>
          {contact.name || contact.address.slice(0, 8)}
        </Item.Header>
        <Item.Description style={{ color: it ? 'red' : 'inherit' }}>
          {it ? 'Currently "It!"': 'Currently safe'}
          <Button
            floated='right'
            content='Tag'
            icon='hand paper outline'
            onClick={() => onSubmit(contact.address)}
          />
        </Item.Description>
      </Item.Content>
    </Item>
  )
}

const PeerList: FunctionComponent<PeerListProps> = (props) => {
  const { peers, onSubmit, current } = props
  if (peers) {
    const me = peers.items[0]
    return (
      <Item.Group relaxed>
        <Peer contact={me} onSubmit={onSubmit} it={me.address === current} />
        <Divider />
        {peers.items.slice(1)
          .map((contact: Contact) => {
            return <Peer
              key={contact.address}
              it={contact.address === current}
              contact={contact}
              onSubmit={onSubmit}
            />
          })
        }
      </Item.Group>
    )
  }
  return null
}

export default PeerList;
