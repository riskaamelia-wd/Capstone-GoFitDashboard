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
            data:[256],
            name:'Home Workout',
            colorBar:'#FFB200',
            colorBackgroundBar:'#FFF5CC',
        },
        {
            data:[90],
            name:'Gym Workout',
            colorBackgroundBar:'#DAD7FE',
            colorBar:'#4339F2'
        },
        {
            data:[154],
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
            <div className="row mt-5 mb-5" style={{margin:'0 auto'}}>
                {radialBarChart?.map((data,id) =>{
                    return(
                    <div 
                        className="col-sm-6 col-lg-4 d-flex justify-content-center" 
                        key={id} 
                        onClick={() => navigate(`/levelDetail/${data.level}`
                        ,{state:{level: data.level }}
                        )}
                    >
                        <RadialBar
                            colorBackground={data.colorBackground}
                            colorText={data.colorText}
                            series={data.series[0]}
                            text={data.level}
                        />
                    </div>
                    )
                    
                })}
            </div>
            <div className="row d-flex justify-content-around ms-5 me-4">
                <div className="col-6 shadow p-3">
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
                <div className="col-5">
                    <Recomended/>
                </div>
            </div>
        </div>
    )
}

export default ManageTraining