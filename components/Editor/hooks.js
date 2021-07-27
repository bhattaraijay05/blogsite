import { useCallback, useState, useEffect } from "react";
import initialData from "./data.json";
export const dataKey = "editorData";

export const useSetData = (editor, data) => {
  useEffect(() => {
    if (!editor || !data) {
      return;
    }
    editor?.isReady.then(() => {
      setTimeout(() => {
        editor.render(data);
      }, 100);
    });
  }, [editor, data]);
};
export const useClearDataCallback = (editor) => {
  return useCallback(
    (ev) => {
      ev.preventDefault();
      if (!editor) {
        return;
      }
      editor.isReady.then(() => {
        setTimeout(() => {
          editor.clear();
        }, 100);
      });
    },
    [editor]
  );
};
