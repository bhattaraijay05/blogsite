import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClapSpinner } from "react-spinners-kit";
import ContentStructure from "./ContentStructure";

const Content = ({ data }) => {
  const [posts, setPosts] = useState(data);
  const [hasMore, setHasMore] = useState(false);

  // const getMorePost = async () => {
  //   const res = await fetch(
  //     `https://jsonplaceholder.typicode.com/todos?_start=${posts.length}&_limit=10`
  //   );
  //   const newPosts = await res.json();
  //   setPosts((post) => [...post, ...newPosts]);
  // };

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        // next={getMorePost}
        hasMore={hasMore}
        loader={setTimeout(() => {
          <div
            style={{
              paddingBottom: 20,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <ClapSpinner size={30} frontColor="indigo" loading={true} />
          </div>;
        }, 1500)}
        endMessage={
          <div
            style={{
              paddingBottom: 20,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <h4>Nothing more to show</h4>
          </div>
        }
      >
        {posts.map((data) => (
          <ContentStructure data={data} key={data.id} />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default Content;
