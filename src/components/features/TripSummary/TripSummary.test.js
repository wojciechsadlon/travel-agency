import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

const array = ['elem1','elem2','elem3'];

describe('Component Trip Summary', () => {
  it('should generate correct link', () => {
    const correctLink = '/trip/abc';
    const link = 'abc';
    const component = shallow(<TripSummary id={link} tags={array} />);

    expect(component.find('.link').prop('to')).toEqual(correctLink);
  });

  it('shoud have correct src and alt for img', () => {
    const correctSrc = 'http://image.jpg';
    const correctAlt = 'birds on the roof';
    const component = shallow(<TripSummary tags={array} image={correctSrc} name={correctAlt} id='abc' />);

    expect(component.find('img').prop('alt')).toEqual(correctAlt);
    expect(component.find('img').prop('src')).toEqual(correctSrc);
  });

  it('should render correct props', () => {
    const expectedName = 'Lorem ipsum';
    const expectedCost = '7000';
    const expectedDays = 3;
    const component = shallow(<TripSummary tags={array} days={expectedDays} name={expectedName} cost={expectedCost} id='abc' />);

    const renderedTitle = component.find('.title').text();
    expect(renderedTitle).toEqual(expectedName);
    expect(component.find('.details>span').at(0).text()).toContain(expectedDays);
    expect(component.find('.details>span').at(1).text()).toContain(expectedCost);
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow()
  });

  it('should generate tags order properly', () => {
    const testTags = ['one', 'two', 'three'];
    const component = shallow(<TripSummary tags={testTags} id='abc' />);
    let spanElem = 0;

    for(let tag of testTags){
      expect(component.find('.tags>span').at(spanElem).text()).toContain(tag);

      spanElem++
    }
  });

  it('shoud not render tags div if this props is not valid', () => {
    const testTags = undefined;
    const component = shallow(<TripSummary tags={testTags}  id='abc' />);

    expect(component.hasClass('tags')).toBe(false);
  });
})