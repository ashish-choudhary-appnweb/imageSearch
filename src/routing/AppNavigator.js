import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomeScreen from '../screens/WelcomeScreen';

const MainStack = createStackNavigator({
  Home: {screen: WelcomeScreen},
});

export default createAppContainer(MainStack);
