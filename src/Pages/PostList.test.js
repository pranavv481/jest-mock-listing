import { render, screen } from "@testing-library/react";
import React from "react";
import PostList from "./PostList";
import { useQuery } from "react-query";
import {
  List,
  ListItem,
  ListIcon,
  Link,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
jest.mock("react-query");

describe("Post List", () => {
    // let log = null;
    // beforeAll(()=>{
    //   log = jest.spyOn(console, "log").mockImplementation((a)=>{
    //       console.error(a+ "mocked")
    //   })
    // })

    // beforeEach(()=>{

    // })
  it("when is Loading is true then loading test should be display", () => {
    //Arrange
    useQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    //Act
    render(<PostList isDrawerOpen={false} closeDrawer={jest.fn()} />);

    // Assertion
    // const text = screen.queryByText("Loading...").innerHTML
    const text = screen.queryByTestId("loading-text");
    // queryBy -- if not return null
    // getBy -- if not it break
    // findBy -- use to wait api call
    expect(text).toHaveTextContent("Loading...");
  });
  it("when is loading is false and data exist then render data", () => {
    useQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        data: [
          { id: 1, title: "Dummy Title" },
          { id: 2, title: "Another Dummy Title" },
        ],
      },
    });

    //Act
    render(
      <BrowserRouter>
        <PostList isDrawerOpen={false} closeDrawer={jest.fn()} />
      </BrowserRouter>
    );

    const data = screen.getAllByTestId("list-item").map((li) => li.textContent);
    console.log(data);
    expect(data).toMatchInlineSnapshot(
     `
      Array [
        "Dummy Title",
        "Another Dummy Title",
      ]
    `
    );
  });
});
