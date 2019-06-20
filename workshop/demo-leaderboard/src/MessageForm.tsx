import React, { SyntheticEvent, Component } from 'react';
import { Input, Form, FormProps, Button, InputProps } from 'semantic-ui-react';

type MessageFormState = {
  message: string
};

type MessageFormProps = {
  onSubmit: (message: string) => Promise<void>
};

class MessageForm extends Component<MessageFormProps, MessageFormState> {
  constructor(props: MessageFormProps) {
    super(props)
    this.state = {
      message: ''
    }
  }
  submit = (event: React.FormEvent<HTMLFormElement>, _: FormProps) => {
    event.preventDefault();
    this.props.onSubmit(this.state.message);
    this.setState({ message: '' });
  }
  change = (_: SyntheticEvent<HTMLElement, Event>, { value }: InputProps) => {
    this.setState({ message: value as string });
  }
  render() {
    const { message } = this.state
    return (
      <Form onSubmit={this.submit}>
        <Input fluid placeholder='Say something...'
          icon='comment outline'
          iconPosition='left'
          label={<Button basic icon='send' type='submit' />}
          labelPosition='right'
          name='message'
          value={message}
          onChange={this.change}
        />
      </Form>
    )
  }
}

export default MessageForm;
