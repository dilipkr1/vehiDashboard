 
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import "./Featured.css"
const Featured = () => {
  return (
    <div className="featured">
      <div className="top flex items-center justify-center text-gray">
        <h1 className=" text-sm text-gray">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom p-5 flex flex-col items-center justify-center gap-4">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="text-sm text-gray">Total sales made today</p>
        <p className="amount font-xl">$420</p>
        <p className="desc font-normal text-sm text-center">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary w-full flex items-center justify-center">
          <div className="item text-center">
            <div className="itemTitle text-sm">Target</div>
            <div className="itemResult  negative text-red">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive text-green">
              <KeyboardArrowDownOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive text-green">
              <KeyboardArrowDownOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
