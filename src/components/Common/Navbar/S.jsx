import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import img from "../../../img/home/Icon material-delete.png";

import "./Postlist.css";

const PostList = () => {
  const MySwal = withReactContent(Swal);
  //get post
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const actualData = await fetch(`https://hcceco.com/api/get_posts`).then(
        (response) => response.json()
      );

      setData(actualData.data);
    }
    getData();
  }, [data]);

  //delete post
  const [products, setProducts] = useState(data);
  const handleCategory = async (id) => {
    const confirmation = window.confirm("Are you Sure?");
    if (confirmation) {
      const formData = { post_id: id };
      const response = await axios
        .post("https://hcceco.com/api/delete_posts", formData)
        .then((data) => {
          const remainItem = products.filter((item) => item.id !== id);
          setProducts(remainItem);
          MySwal.fire("Good job!", "successfully delete", "success");
        })
        .catch((error) => {
          MySwal.fire("Something Error Found.", "warning");
        });
    }
  };
  return (
    <div className="row">
      <div className="col-md-12" id="withdraw">
        <div className="card">
          {/* /.card-header */}
          <div className="card-body card_body_sm">
            <table id="example" className="table table-bordered table-hover">
              <thead>
                <tr style={{ background: "#C4BFDF" }}>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "center" }}>User</th>
                  <th style={{ textAlign: "center" }}>Category</th>
                  <th style={{ textAlign: "center" }}>Title</th>
                  <th style={{ textAlign: "center", width: "30%" }}>
                    Description
                  </th>
                  <th style={{ textAlign: "center" }}>Feed</th>
                  <th style={{ textAlign: "center" }}>Report</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data) => (
                  <tr key={data.news_feeds.id}>
                    <td>{data.news_feeds.id}</td>
                    <td>{data.news_feeds.name}</td>
                    <td>{data.news_feeds.feed_category}</td>
                    <td>{data.news_feeds.title}</td>
                    <td id="summary">
                      <p
                        class="collapse"
                        id={`collapseSummary${data.news_feeds.id}`}
                      >
                        {data.news_feeds.caption}
                      </p>
                      <a
                        class="collapsed"
                        data-toggle="collapse"
                        href={`#collapseSummary${data.news_feeds.id}`}
                        aria-expanded="false"
                        aria-controls="collapseSummary"
                      ></a>
                    </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {data.news_feeds.feed_type}
                    </td>
                    <td>{data.total_reports}</td>
                    <td>{data.news_feeds.date.slice(0, 10)}</td>
                    <td>
                      <img
                        src={img}
                        alt=""
                        onClick={() => handleCategory(data.news_feeds.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
        {/* /.card */}
      </div>
      {/* /.col */}
    </div>
  );
};

export default PostList;
