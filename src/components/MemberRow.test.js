import { mount } from "enzyme";
import MemberRow from "./MemberRow";

const row = {
  id: "1",
  name: "Aaron Miles",
  email: "aaron@mailinator.com",
  role: "member",
};

describe("<MemberRow />", () => {
  let wrapper;

  it("member rows renders correctly without crashing", () => {
    wrapper = mount(<MemberRow row={row} />, {
      attachTo: document.createElement("tbody"),
    });
  });

  it("checkbox is unchecked initially", () => {
    expect(wrapper.find('input[type="checkbox"]').prop("checked")).toBe("");
  });

  it("accepts row as props", () => {
    expect(wrapper.props().row).toEqual(row);
  });
});
