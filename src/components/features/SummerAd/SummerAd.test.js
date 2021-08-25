import React from "react";
import { shallow } from "enzyme";
import SummerAd from "./SummerAd";

const select = {
  title: ".title",
};

const trueDate = Date;

const mockDate = (customDate) =>
  class extends Date {
    constructor(...args) {
      if (args.length) {
        super(...args);
      } else {
        super(customDate);
      }
      return this;
    }
    static now() {
      return new Date(customDate);
    }
  };

// const checkDescriptionAtTime = (date, expectedDescription) => {
//   it(`should show component at summer ${date}`, () => {
//     global.Date = mockDate(`2021-${date}T00:00:00.135Z`);

//     const component = shallow(<SummerAd {...mockProps} />);
//     const description = component.find(select.title).text();
//     expect(description).toEqual(expectedDescription);

//     global.Date = trueDate;
//   });
// };

// if date is 21.06 - 23.09 component should be rendered empty

const getRenderedDescription = (date) => {
  global.Date = mockDate(`2021-${date}T00:00:00.135Z`);

  const component = shallow(<SummerAd />);
  const description = component.find(select.title).text();
  global.Date = trueDate;

  return description;
}

describe("Component SummerAd", () => {
  it.each([ '07-01', '06-22' ])
  ('should render empty string if date is in summer', (date) => {
    const description = getRenderedDescription(date);
    const expectedDescription = '';

    expect(description).toEqual(expectedDescription);
  });

  it.each([
    ['06-15', '5 days to summer!'],
    ['04-05', '76 days to summer!']
  ])('should render number of days to summer date is not in summer', (date, expectedDescription) => {
    const description = getRenderedDescription(date);

    expect(description).toEqual(expectedDescription);
  });
  
  it('should render "one day to summer!" if summer begins next day', () => {
    const description = getRenderedDescription('06-19');
    const expectedDescription = 'one day to summer!';

    expect(description).toEqual(expectedDescription);
  });
});

// if date is not summer it should render how many days is till 21.06

// describe("Component SummerAd with mocked not summer Date", () => {
//   checkDescriptionAtTime("06-15", "5 " + mockProps.title);
//   checkDescriptionAtTime("04-05", "76 " + mockProps.title);
// });

// if it is one day ahead summer it should render "one" instead of 1

// describe("Component SummerAd with mocked one day before summer date", () => {
//   checkDescriptionAtTime("06-19", "one day to summer!");
// });