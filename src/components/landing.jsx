import React from "react";
import "../App.css";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

function landing() {
  return (
    <div id="land" className="landing-container h-screen">
      <Card className="input-card">
        <form className="card-content flex flex-col gap-4">
          <div className="flex-col">
            <div className="mb-2 block">
              <Label
                className="text-white"
                htmlFor="email1"
                value="Enter you details here:"
              />
            </div>
            <TextInput
              className=""
              id="email1"
              type="email"
              placeholder="name@smthg.com"
              required
            />
          </div>
          <button class="w-50 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out flex items-center justify-center">
            <span class="font-medium text-[#333] group-hover:text-white">
              Submit
            </span>
          </button>
        </form>
      </Card>
    </div>
  );
}

export default landing;
