import Cover from "../../elements/Card/Cover";
import imgCover from '../../assets/icons/Appreciation 1.svg'
import RadialBar from "../../components//Chart/RadialBar";
import Recomended from "../../components/Recomended/Recomended";
import { useNavigate } from "react-router-dom";
import Bar from "../../components/Chart/Bar";

const ManageTraining = () => {
    const navigate = useNavigate()
    // const seriesBeginner = [95]
    // const seriesIntermediate = [70]
    // const seriesAdvanced = [73]

    // const seriesGym =[90]
    // const seriesHome = [256]
    // const seriesOuside = [54]

    const barChart = [
        {
            data:[56],
            name:'Home Workout',
            colorBar:'#FFB200',
            colorBackgroundBar:'#FFF5CC',
        },
        {
            data:[40],
            name:'Gym Workout',
            colorBackgroundBar:'#DAD7FE',
            colorBar:'#4339F2'
        },
        {
            data:[74],
            name:'Outside Workout',
            colorBackgroundBar:'#CCF8FE',
            colorBar:'#02A0FC'
        }
    ]

    const radialBarChart = [
        { 
            level: 'Beginner', 
            series: [95], 
            colorBackground:'#FFEFCC',
            colorText:'#FF7F00'
        },
        { 
            level: 'Intermediate', 
            series: [70],
            colorBackground:'#CCCCFF',
            colorText:'#3F3FFF'
        },
        { 
            level: 'Advanced', 
            series: [73],
            colorBackground:'#98F2FE',
            colorText:'#00ACFC'
        },
      ];


    return(
        <div className="container-fluid">
            <Cover
                img={imgCover}
                list1={'Home'}
                text={'Training'}
            />
            <div className="d-flex justify-content-around row mt-5 mb-5" style={{margin:'0 auto'}}>
            {/* key={id} 
                        onClick={() => navigate(`/levelDetail/${data.level}`
                        ,{state:{level: data.level }}
                        )} */}
                {radialBarChart?.map((data,id) =>{
                    return(
                        <RadialBar
                            key={id}
                            level={data.level}
                            colorBackground={data.colorBackground}
                            colorText={data.colorText}
                            series={data.series[0]}
                            text={data.level}
                        />
                    )
                    
                })}
            </div>
            <div className="row d-flex justify-content-around ms-md--5 me-md-4">
                <div className="col-lg-6 shadow mb-4 p-3">
                    <p className="fs-2 fw-bold">Best Training</p>
                    {
                        barChart?.map((data, id) => {
                            return(
                                <div key={id}>
                                    <Bar
                                        data={data.data[0]}
                                        name={data.name}
                                        colorBar={data.colorBar}
                                        colorBackgroundBar={data.colorBackgroundBar}
                                    />
                                </div>
                            )
                        })
                    }                    
                </div>
                <div className="col-lg-5 mb-4">
                    <Recomended/>
                </div>
            </div>
        </div>
    )
}

export default ManageTraining