/* eslint-disable default-case */
import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should render properly', () => {
    const component = shallow(<OrderOption type='text' name='abc' />);

    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render title props properly', () => {
    const testTitle = 'xyz';
    const component = shallow(<OrderOption type='text' name={testTitle} />);

    expect(component.find('.title').text()).toEqual(testTitle);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption; /* 1 */
    
    beforeEach(() => {
      mockSetOrderOption = jest.fn(); /* 2 */
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption} /* 3 */
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
        
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
        
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;        
      }
      case 'icons': {
        it('contains proper class and name', () => {
          const icons = renderedSubcomponent.find('Icon');

          expect(icons.at(0).prop('name')).toBe('times-circle');
          expect(icons.at(1).prop('name')).toBe(mockProps.values[0].icon);
          expect(icons.at(2).prop('name')).toBe(mockProps.values[1].icon);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('.component>div').last().simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          // dlaczego w teście zwraca wykonanie funkcji dwa razy?
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'checkboxes': {
        it('contains right value props', () => {
          const inputs = renderedSubcomponent.find('inputs');

          inputs.forEach((input, i) => expect(input.at(i).prop('value')).toBe(mockProps.values[i].id))
        });

        it('should run setOrderOption function on check', () => {
          renderedSubcomponent.findWhere(n => n.name() === 'input' && n.prop('value') === testValue).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue]});
        });
        break;
      }
      case 'number': {
        it('contains right min, max and value props', () => {
          const inputs = renderedSubcomponent.find('inputs');

          inputs.forEach((input, i) => expect(input.at(i).prop('min')).toBe(mockProps.limits.min))
          inputs.forEach((input, i) => expect(input.at(i).prop('max')).toBe(mockProps.limits.max))
          inputs.forEach((input, i) => expect(input.at(i).prop('value')).toBe(mockProps.currentValue))
        });

        it('should run setOrderOption function on changed number', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      case 'text': {
        it('contains right value and placeholder props', () => {
          const inputs = renderedSubcomponent.find('inputs');

          inputs.forEach((input, i) => expect(input.at(i).prop('placeholder')).toBe(mockProps.name))
          inputs.forEach((input, i) => expect(input.at(i).prop('value')).toBe(mockProps.currentValue))
        });

        it('should run setOrderOption function on changed text', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'date': {
        it('contains DatePicker plugin', () => {
          const container = renderedSubcomponent.find('div');

          expect(container.find(DatePicker)).toBeTruthy();
        });

        it('should run setOrderOption function on change date', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);

          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
    }
  });
}