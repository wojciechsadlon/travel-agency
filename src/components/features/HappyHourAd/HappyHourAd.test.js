import React from "react";
import { shallow } from "enzyme";
import HappyHourAd from "./HappyHourAd";

const select = {
  title: ".title",
  promoDescription: ".promoDescription",
};

const mockProps = {
  title: "Happy Hours!",
  promoDescription: "from 12 to 13 pm",
};

beforeAll(() => {
  const utilsModule = jest.requireActual('../../../utils/formatTime.js');
  utilsModule.formatTime = jest.fn(seconds => seconds);
});

describe("Component HappyHourAd", () => {
  it("should render correctly", () => {
    expect(() => shallow(<HappyHourAd />)).toBeTruthy();
  });

  it("should have title and description elements", () => {
    const component = shallow(<HappyHourAd />);

    expect(component.exists(select.title)).toBe(true);
    expect(component.exists(select.promoDescription)).toBe(true);
  });

  it("should render correct title from props", () => {
    const testedTitle = "This is my tested title!";
    const component = shallow(
      <HappyHourAd {...mockProps} title={testedTitle} />
    );

    const displayedTitle = component.find(select.title).text();

    expect(displayedTitle).toEqual(testedTitle);
  });
});

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
      return new Date(customDate).getTime();
    }
  };

const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);
    const description = component.find(select.promoDescription).text();
    expect(description).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe("Component HappyHourAd with mocked Date", () => {
  checkDescriptionAtTime("11:57:58", "122");
  checkDescriptionAtTime("11:59:59", "1");
  checkDescriptionAtTime("13:00:00", 23 * 60 * 60 + "");
});

describe("Component with mocked promo date", () => {
  checkDescriptionAtTime("12:30:00", mockProps.promoDescription);
  checkDescriptionAtTime("12:00:00", mockProps.promoDescription);
  checkDescriptionAtTime("12:59:59", mockProps.promoDescription);
});

const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());

    jest.advanceTimersByTime(delaySeconds * 1000);
    const description = component.find(select.promoDescription).text();
    expect(description).toEqual(expectedDescription);

    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe("Component HappyHourAd with mocked Date and delay", () => {
  checkDescriptionAfterTime("11:57:58", 2, "120");
  checkDescriptionAfterTime("11:59:58", 1, "1");
  checkDescriptionAfterTime("13:00:00", 60 * 60, 22 * 60 * 60 + "");
});

describe("Component HappyHourAd with mocked Date and delayed", () => {
  checkDescriptionAfterTime("11:59:58", 2, mockProps.promoDescription);
});