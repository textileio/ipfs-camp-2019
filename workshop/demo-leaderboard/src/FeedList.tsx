import React, { FunctionComponent } from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import { FeedItem, FeedItemList } from '@textile/js-http-client';
import Moment from 'react-moment';

type ItemProps = {
  item: FeedItem
};

type ItemListProps = {
  feed?: FeedItemList
}

const chooseIcon = (type: string) => {
  switch(type) {
    case 'tag':
      return 'hand paper outline'
    case 'join':
      return 'sign-in'
    case 'leave':
      return 'sign-out'
    case 'message':
      return 'comment outline'
    default:
      return 'chevron right'
  }
}

const Item: FunctionComponent<ItemProps> = (props) => {
  const { payload } = props.item
  return (
    <Feed.Event>
      <Feed.Label icon={payload.info && chooseIcon(payload.info.event)} />
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{payload.user.name}</Feed.User>
          {' '}
          {payload.info && payload.info.extra}
          {' '}
          {payload.info && payload.info.event !== 'message' && 
            <Feed.User>{payload.info.target}</Feed.User>
          }
          <Feed.Date>
            <Moment fromNow>{payload.date}</Moment>
          </Feed.Date>
        </Feed.Summary>
        {payload.info && payload.info.event === 'message' &&
          <Feed.Extra text>
            {payload.info.target}
          </Feed.Extra>
        }
        <Feed.Meta>
          <Feed.Like>
            <Icon name='heart outline' /> {payload.likes && payload.likes.length}
              </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  )
}

const ItemList: FunctionComponent<ItemListProps> = (props) => {
  const { feed } = props
  if (feed) {
    return (
      <Feed size="large" style={{ height: 'calc(100vh - 150px)', overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
        {feed.items
          .map((item: FeedItem) => {
            return <Item key={item.block} item={item} />
          })
        }
      </Feed>
    )
  }
  return null
}

export default ItemList;


//   <Feed.Event>
//     <Feed.Label icon='hand paper outline' />
//     <Feed.Content>
//       <Feed.Summary>
//         <Feed.User>Carson</Feed.User> tagged <Feed.User>Andrew</Feed.User>
//         <Feed.Date>Just now</Feed.Date>
//       </Feed.Summary>
//       <Feed.Meta>
//         <Feed.Like>
//           <Icon name='heart outline' /> 4 Likes
//               </Feed.Like>
//       </Feed.Meta>
//     </Feed.Content>
//   </Feed.Event>
//   <Feed.Event>
//     <Feed.Label icon='hand paper outline' />
//     <Feed.Content>
//       <Feed.Summary>
//         <Feed.User>Carson</Feed.User> tagged <Feed.User>Andrew</Feed.User>
//         <Feed.Date>Just now</Feed.Date>
//       </Feed.Summary>
//       <Feed.Meta>
//         <Feed.Like>
//           <Icon name='heart outline' /> 4 Likes
//               </Feed.Like>
//       </Feed.Meta>
//     </Feed.Content>
//   </Feed.Event>
//   <Feed.Event>
//     <Feed.Label icon='hand paper outline' />
//     <Feed.Content>
//       <Feed.Summary>
//         <Feed.User>Carson</Feed.User> tagged <Feed.User>Andrew</Feed.User>
//         <Feed.Date>Just now</Feed.Date>
//       </Feed.Summary>
//       <Feed.Meta>
//         <Feed.Like>
//           <Icon name='heart outline' /> 4 Likes
//               </Feed.Like>
//       </Feed.Meta>
//     </Feed.Content>
//   </Feed.Event>
//   <Feed.Event>
//     <Feed.Label icon='hand paper outline' />
//     <Feed.Content>
//       <Feed.Summary>
//         <Feed.User>Aaron</Feed.User> tagged <Feed.User>Carson</Feed.User>
//         <Feed.Date>10 minutes ago</Feed.Date>
//       </Feed.Summary>
//       <Feed.Meta>
//         <Feed.Like>
//           <Icon name='heart outline' /> 0 Likes
//               </Feed.Like>
//       </Feed.Meta>
//     </Feed.Content>
//   </Feed.Event>
//   <Feed.Event>
//     <Feed.Label icon='user outline' />
//     <Feed.Content>
//       <Feed.Summary>
//         <Feed.User>Carson</Feed.User> joined 'The Game'
//                     <Feed.Date>2 hours ago</Feed.Date>
//       </Feed.Summary>
//     </Feed.Content>
//   </Feed.Event>
//   <Feed.Event>
//     <Feed.Label icon='hand paper outline' />
//     <Feed.Content>
//       <Feed.Summary>
//         <Feed.User>Sander</Feed.User> tagged <Feed.User>Aaron</Feed.User>
//         <Feed.Date>2 hours ago</Feed.Date>
//       </Feed.Summary>
//       <Feed.Meta>
//         <Feed.Like>
//           <Icon name='heart outline' /> 1 Likes
//               </Feed.Like>
//       </Feed.Meta>
//     </Feed.Content>
//   </Feed.Event>
//   <Feed.Event>
//     <Feed.Label icon='user outline' />
//     <Feed.Content>
//       <Feed.Summary>
//         <Feed.User>Benjamin</Feed.User> left 'The Game'
//                     <Feed.Date>2 hours ago</Feed.Date>
//       </Feed.Summary>
//     </Feed.Content>
//   </Feed.Event>
//   <Feed.Event>
//     <Feed.Label icon='comment outline' />
//     <Feed.Content>
//       <Feed.Summary>
//         <Feed.User>Carson</Feed.User> said
//                     <Feed.Date>2 hours ago</Feed.Date>
//       </Feed.Summary>
//       <Feed.Extra text>
//         "you can't catch me!"
//                   </Feed.Extra>
//     </Feed.Content>
//   </Feed.Event>
//   <Feed.Event>
//     <Feed.Label icon='hand paper outline' />
//     <Feed.Content>
//       <Feed.Summary>
//         <Feed.User>Benjamin</Feed.User> tagged <Feed.User>Sander</Feed.User>
//         <Feed.Date>Yesterday</Feed.Date>
//       </Feed.Summary>
//       <Feed.Meta>
//         <Feed.Like>
//           <Icon name='heart outline' /> 2 Likes
//               </Feed.Like>
//       </Feed.Meta>
//     </Feed.Content>
//   </Feed.Event>
// </Feed>