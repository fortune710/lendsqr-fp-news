import React from 'react';
import { fireEvent, render } from "@testing-library/react-native";
import { describe, it, expect } from "@jest/globals"
import ListHeader from "../components/ListHeader";
import { NavigationProp, ParamListBase } from '@react-navigation/native';

//mock('react-native/libraries/eventemitter/nativeeventemitter');

describe('ListHeader', () => {
    it('renders the greeeting message', async () => {
        
        const navigation = {
            navigate: () => {}
        } as NavigationProp<ParamListBase>
    
        const listHeader = render(<ListHeader/>);
        const greeting = listHeader.getByHintText("Hello");
        expect(greeting).toBeTruthy()
    });

});