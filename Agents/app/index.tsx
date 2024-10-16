import React, { useState, useCallback, useEffect } from 'react'
import { View, Platform, KeyboardAvoidingView, SafeAreaView, Text, StyleSheet } from 'react-native'
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
            backgroundColor: '#8A2BE2',
            borderRadius: 15,
            padding: 5
          },
          left: {
            backgroundColor: '#9370DB',
            borderRadius: 15,
            padding: 5
          }
        }}
        textStyle={{
          right: {
            color: '#FFFFFF'
          },
          left: {
            color: '#FFFFFF'
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
          backgroundColor: '#F8F4FF',
          borderTopWidth: 1,
          borderTopColor: '#9370DB',
          padding: 8,
          borderRadius: 20,
          margin: 10
        }}
        primaryStyle={{ alignItems: 'center' }}
        textInputStyle={{
          color: '#4B0082',
          backgroundColor: '#E6E6FA',
          borderRadius: 15,
          paddingHorizontal: 12,
          marginRight: 10
        }}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2E0854' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={styles.backgroundContainer}>
          <View style={styles.backgroundOverlay} />
        </View>
        <GiftedChat
          messages={messages}
          onSend={(messages: ChatMessage[]) => onSend(messages)}
          user={{
            _id: 1
          }}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          alwaysShowSend
          renderSend={(props) => (
            <Send {...props}>
              <View style={styles.sendButton}>
                <Text style={styles.sendButtonText}>➤</Text>
              </View>
            </Send>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2E0854'
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(138, 43, 226, 0.1)'
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8A2BE2',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 20
  }
})
