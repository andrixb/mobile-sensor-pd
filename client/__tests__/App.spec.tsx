import * as React from 'react';
import { shallow } from 'enzyme';
import App from '../src/app/containers/App/App';


describe('App', () => {
    let component: any;

    beforeEach(()=>{
        component  = shallow(<App />);
    });

    it('renders without crashing', () => {
        expect(component).toMatchSnapshot();
    });
    
    it('renders the App', () => {
        expect(component.find('App')).toBeTruthy();
    });
});

