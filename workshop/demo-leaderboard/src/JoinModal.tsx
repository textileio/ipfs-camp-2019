import React, { SyntheticEvent, Component } from 'react';
import { Modal, Form, FormProps, Button, Header, Dropdown, DropdownProps, DropdownItemProps } from 'semantic-ui-react';

type JoinModalState = {
  thread: string
};

type JoinModalProps = {
  onSubmit: (thread: string) => void,
  threadList?: DropdownItemProps[]
};

class JoinModal extends Component<JoinModalProps, JoinModalState> {
  constructor(props: JoinModalProps) {
    super(props)
    this.state = {
      thread: ''
    }
  }
  addition = (_: React.KeyboardEvent<HTMLElement>, { value }: DropdownProps) => {
    if (value) {
      this.setState({ thread: value as string })
    }
  }
  submit = (event: React.FormEvent<HTMLFormElement>, _: FormProps) => {
    event.preventDefault();
    if (this.state.thread) {
      this.props.onSubmit(this.state.thread);
    }
  }
  change = (_: SyntheticEvent<HTMLElement, Event>, { value }: DropdownProps) => {
    this.setState({
      thread: value as string
     });
  }
  render() {
    const { thread } = this.state;
    const { threadList } = this.props;
    return (
      <Modal defaultOpen closeOnEscape={false} closeOnDimmerClick={false}>
        <Header>Join a game</Header>
        <Modal.Content>
          <Form id='choose' onSubmit={this.submit}>
            <Dropdown
              options={threadList}
              placeholder='Choose thread...'
              search
              selection
              fluid
              allowAdditions
              additionLabel='Join new thread: '
              value={thread}
              onAddItem={this.addition}
              onChange={this.change}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button content='Join' color='green' form='choose' />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default JoinModal;
