import React from "react";

export default class extends React.Component
{
    componentDidMount() {
        chrome.runtime.sendMessage("montei");
    }
    render() {
        return <section><h1>This message from me</h1><p>Hello you!</p></section> ;
    }
}