import React from "react";
import { shallow } from "enzyme";
import SummerAd from "./SummerAd";

const select = {
  title: ".title",
};

const mockProps = {
  title: 'days to summer!',
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

const checkDescriptionAtTime = (date, expectedDescription) => {
  it(`should show component at summer ${date}`, () => {
    global.Date = mockDate(`2021-${date}T00:00:00.135Z`);

    const component = shallow(<SummerAd {...mockProps} />);
    const description = component.find(select.title).text();
    expect(description).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

// if date is 21.06 - 23.09 component should be rendered empty

describe("Component SummerAd with mocked summer Date", () => {
  checkDescriptionAtTime("07-01", "");
  checkDescriptionAtTime("06-22", "");
});

// if date is not summer it should render how many days is till 21.06

describe("Component SummerAd with mocked not summer Date", () => {
  checkDescriptionAtTime("06-15", "5 " + mockProps.title);
  checkDescriptionAtTime("04-05", "76 " + mockProps.title);
});

// if it is one day ahead summer it should render "one" instead of 1

describe("Component SummerAd with mocked one day before summer date", () => {
  checkDescriptionAtTime("06-19", "one day to summer!");
});