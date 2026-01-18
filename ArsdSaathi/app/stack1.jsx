import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Attendance from './tab1/AttendanceTab';
import Details from './tab1/DetailsTab';
import Faculty from './tab1/FacultyTab';
import Home from './tab1/HomeTab';
import Login from './tab1/LoginTab';

const Stack = createStackNavigator();

export default function Stack1() {
	return (
	    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
	    	<Stack.Screen name="Login" component={Login} />
	    	<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Attendance" component={Attendance} />
			<Stack.Screen name="Details" component={Details} />
			<Stack.Screen name="Faculty" component={Faculty} />
	    </Stack.Navigator>
	);
}

