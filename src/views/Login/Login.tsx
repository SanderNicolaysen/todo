import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '../../components';
const img = require('../../assets/images/todo.png');

type LoginProps = {
  onAuthenticatePress: () => Promise<void>;
};

export const Login: React.FC<LoginProps> = ({ onAuthenticatePress }) => {
  return (
    <View testID="loginComponentId">
      <View style={styles.imageContainer}>
        <Image source={img} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>To Do</Text>
        <Text style={styles.description}>
          Elevate your productivity with our ToDo app. Effortlessly manage
          tasks, anytime, anywhere.
        </Text>
        <Button onPress={onAuthenticatePress} title="Login" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 500,
    backgroundColor: '#E0F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 50,
    fontWeight: '400',
    marginVertical: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 50,
  },
});
