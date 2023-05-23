import Cover from "../../elements/Card/Cover";
import CardTraining from "../../elements/Card/CardTraining";
import PopUp from "../../components/PopUp/PopUp";
import abs from '../../assets/img/abs.svg'
import imgCover from '../../assets/icons/Appreciation 1.svg'

const LevelDetail = () => {
    return(
        <div className="container-fluid">
            <Cover
                img={imgCover}
                text={'Training'}
                list1={'Home'}
                list2={'Advanced'}
            />
            <div className="d-flex flex-row row  mt-5 mb-5">
                <div className="col-4 d-flex justify-content-center mb-5">
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="col-4 d-flex justify-content-center mb-5">
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="col-4 d-flex justify-content-center mb-5">
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="col-4 d-flex justify-content-center mb-5">
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="col-4 d-flex justify-content-center mb-5">
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="col-4 d-flex justify-content-center mb-5">
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="col-4 d-flex justify-content-center mb-5">
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="col-4 d-flex justify-content-center mb-5">
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="col-4 d-flex justify-content-center mb-5">
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
            </div>
            <div style={{position:'fixed', bottom:'5vw', right:'5vw'}}>
                <PopUp/>
            </div>
        </div>
    )
}

export default LevelDetail