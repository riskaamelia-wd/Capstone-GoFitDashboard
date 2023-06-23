import { Puff } from "react-loader-spinner";

const Loading = () => {
    return(
        <div className="d-flex align-items-center justify-content-center">
        <Puff
          height="80"
          width="80"
          radius={1}
          color="#FFA83F"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    )
}

export default Loading