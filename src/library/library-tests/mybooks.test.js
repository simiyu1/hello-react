
import React from "react";
import { shallow, configure, mount} from "enzyme";
import { MemoryRouter } from "react-router";
import {expect} from "chai";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import MyBooks, {fetchBooks} from "../mybooks";

configure({ adapter: new Adapter() });

describe("Calls My books", function(){
  it("Component mounts", function(){
    const fetchbook = sinon.stub().resolves({
      "page": 1,
      "total_results": 18,
      "total_pages": 3,
      "per_page": 8,
      "objects": [
        {
          "book_id": 6,
          "author": "Robert Ray",
          "title": "Murdock Cracks Ice",
          "Copies": "9",
          "ISBN": "968-3-16-145466-0"
        }
      ],
      "message": "Books retrieved"
    });
    const component = mount(<MemoryRouter><MyBooks fetchBooks={fetchbook}/></MemoryRouter>);
    expect(fetchBooks.callcount).to.equal();
  });
  
});

