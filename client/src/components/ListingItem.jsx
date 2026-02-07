import React from "react";
import { Link } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ListingItem = ({ listing, id }) => {
  return (
    <li>
      <Link to={`/category/${listing.type}/${id}`}>
        <img src={listing.imgUrls[0]} alt="Listing image" />
        <p>{dayjs(listing.timestamp?.toDate()).fromNow()}</p>
        <div>
          <p>{listing.name}</p>
          <p>
            {listing.offer
              ? `₹${Number(listing.discountedPrice).toLocaleString("en-IN")}`
              : `₹${Number(listing.regularPrice).toLocaleString("en-IN")}`}
            {listing.type === "rent" && " / month"}
          </p>
          <div>
            <p>{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}</p>
          </div>
          <div>
            <p>{listing.baths > 1 ? `${listing.baths} Baths` : "1 Bath"}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListingItem;
