import React, { useState, useCallback, useEffect } from 'react'
import { View, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  IMessage,
  User,
  BubbleProps,
  InputToolbarProps,
  Send
} from 'react-native-gifted-chat'

interface ChatMessage extends IMessage {
  user: User
}

export default function Index() {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Welcome to the chat! I'm a mock bot that will echo your messages.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChatBot',
          avatar: 'https://placeimg.com/140/140/tech'
        }
      }
    ])
  }, [])

  const mockSendMessage = (message: ChatMessage[]): void => {
    setTimeout(() => {
      const botResponse: ChatMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: `You said: "${message[0].text}"`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChatBot',
          avatar: 'https://placeimg.com/140/140/tech'
        }
      }
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [botResponse]))
    }, 1000)
  }

  const onSend = useCallback((newMessages: ChatMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages))
    mockSendMessage(newMessages)
  }, [])

  const renderBubble = (props: BubbleProps<ChatMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#007AFF'
          },
          left: {
            backgroundColor: '#E5E5EA'
          }
        }}
        textStyle={{
          right: {
            color: '#FFFFFF'
          },
          left: {
            color: '#000000'
          }
        }}
      />
    )
  }

  const renderInputToolbar = (props: InputToolbarProps<ChatMessage>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#F5F5F5',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          padding: 8
        }}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages: ChatMessage[]) => onSend(messages)}
          user={{
            _id: 1
          }}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          alwaysShowSend
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
