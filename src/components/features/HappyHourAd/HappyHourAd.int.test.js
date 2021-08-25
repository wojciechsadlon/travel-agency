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
  checkDescriptionAtTime("11:57:58", "00:02:02");
  checkDescriptionAtTime("11:59:59", "00:00:01");
  checkDescriptionAtTime("13:00:00", "23:00:00");
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
  checkDescriptionAfterTime("11:57:58", 2, "00:02:00");
  checkDescriptionAfterTime("11:59:58", 1, "00:00:01");
  checkDescriptionAfterTime("13:00:00", 60 * 60, "22:00:00");
});

