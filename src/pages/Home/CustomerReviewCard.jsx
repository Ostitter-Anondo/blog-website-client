import PropTypes from "prop-types";
const CustomerReviewCard = ({ data }) => {
  return (
    <div className="w-80 md:w-96 p-6 bg-neutral/30 backdrop-blur-sm rounded flex flex-col gap-3">
      <div className="flex gap-3">
        <img
          src={`https://eu.ui-avatars.com/api/?name=${data.fname}+${data.lname}&size=35`}
          className="rounded-full"
          alt=""
        />
        <div>
          <h3 className="font-bold text-primary text-lg">{data.fname}{" "}{data.lname}</h3>
          <p className="font-extralight text-neutral-content/60 text-sm">
            {data.date}
          </p>
        </div>
      </div>
      <p>{data.review}</p>
    </div>
  );
};

CustomerReviewCard.propTypes = {
  data: PropTypes.object,
};

export default CustomerReviewCard;
