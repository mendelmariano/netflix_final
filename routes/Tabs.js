import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './../screen/Home';
import More from './../screen/More';
import {Entypo, AntDesign, Feather, MaterialIcons} from '@expo/vector-icons';
import { translate } from "../languages/utils";

const Tab = createBottomTabNavigator();

const Tabs = (props) => {

    return (
        <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'white',
          style: {
            backgroundColor: '#1a1718',
            borderTopColor: 'transparent',
          },
        }}>

        <Tab.Screen 
        options={{
          tabBarLabel: translate("Home"),
          tabBarIcon: ({color, size}) =>(
            <Entypo name="home" size={size} color={color} />
          ),
        }}
        name="Home" component={Home} />

        <Tab.Screen name="Busca"
        options={{
          tabBarLabel: translate("Search"),
          tabBarIcon: ({color, size}) =>(
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
        component={Home} />

        <Tab.Screen name="Em Breve" 
        options={{
          tabBarLabel:  translate("Soon"),
          tabBarIcon: ({color, size}) =>(
            <MaterialIcons name="perm-media" size={size} color={color} />
          ),
        }}
        component={Home} />

        <Tab.Screen 
        name="Downloads" 
        options={{
          tabBarLabel: translate("Downloads"),
          tabBarIcon: ({color, size}) =>(
            <Feather name="download" size={size} color={color} />
          ),
        }}
        component={Home} />

        <Tab.Screen name="More"
        options={{
          tabBarLabel: translate("More"),
          tabBarIcon: ({color, size}) =>(
            <Feather name="menu" size={size} color={color} />
          ),
        }}
        component={More} />
      </Tab.Navigator>
    );
}

export default Tabs