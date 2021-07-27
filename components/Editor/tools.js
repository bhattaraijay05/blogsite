import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import Image from "@editorjs/image";
import AlignmentBlockTune from "editorjs-text-alignment-blocktune";
import Alert from "editorjs-alert";
import Underline from "@editorjs/underline";
import NestedList from "@editorjs/nested-list";

export const tools = {
  header: {
    class: Header,
    inlineToolbar: true,
    tunes: ["anyTuneName"],
  },
  list: {
    class: NestedList,
    inlineToolbar: true,
    tunes: ["anyTuneName"],
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    tunes: ["anyTuneName"],
  },
  embed: Embed,
  table: {
    class: Table,
    inlineToolbar: true,
    tunes: ["anyTuneName"],
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    tunes: ["anyTuneName"],
  },

  underline: Underline,
  code: {
    class: Code,
    inlineToolbar: true,
    tunes: ["anyTuneName"],
  },
  linkTool: {
    class: LinkTool,
    // config: {
    //   endpoint: "", // Your backend endpoint for url data fetching
    // },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    tunes: ["anyTuneName"],
  },
  marker: Marker,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: {
    class: SimpleImage,
    inlineToolbar: true,
    tunes: ["anyTuneName"],
  },
  alert: {
    class: Alert,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+A",
    config: {
      defaultType: "primary",
      messagePlaceholder: "Enter something",
    },
  },
  Image: {
    class: Image,
    inlineToolbar: true,
    tunes: ["anyTuneName"],
  },
  anyTuneName: {
    class: AlignmentBlockTune,
    config: {
      default: "left",
      blocks: {
        header: "center",
        list: "left",
      },
    },
  },
};
