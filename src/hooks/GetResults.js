import { useEffect } from "react";
import answeres from "../database/result";
import { useSelector } from "react-redux";
import { useState } from "react";

export const useGetResult = () => {
  const [result, setResult] = useState({ result: {}, response: {} });

  const [getResults, setResults] = useState();

  const answered = useSelector((state) => state.results.result);
  const status = useSelector((state) => state.results.status);
  const timer = useSelector((state) => state.results.timer);

  // Set Answeres from Database
  useEffect(() => {
    (async () => {
      const data = answeres;
      setResults(data);
    })();
  }, []);

  // Creating Exam result Objects to upload and display
  useEffect(() => {
    if (getResults) {
      const response = {};

      //Setting Response Obj
      for (let key in timer) {
        if (status[key].isMarked && status[key].isAnswered) {
          response[key] = {
            isMandS: true,
            timeSpent: timer[key],
            ans: answered[key],
          };
        } else if (status[key].isMarked) {
          response[key] = {
            isM: true,
            timeSpent: timer[key],
          };
        } else if (status[key].isAnswered) {
          response[key] = {
            isA: true,
            timeSpent: timer[key],
            ans: answered[key],
          };
        } else if (status[key].isVisited) {
          response[key] = {
            isNA: true,
            timeSpent: timer[key],
          };
        }
      }

      //response Object
      const Responses = {
        sectionDetails: getResults.sections,
        resObj: response,
      };

      // Setting Result Object
      const result = {
        maxMarks: getResults.maxMarks,
        maxTime: getResults.maxTime,
        secDet: [],
      };

      const sectionDetails = [];

      for (let sec in getResults.sections) {
        sectionDetails.push({
          title: getResults.sections[sec].title,
          components: [],
        });
        for (let comp in getResults.sections[sec].components) {
          sectionDetails[sec].components.push({
            title: getResults.sections[sec].components[comp].title,
            numQues: getResults.sections[sec].components[comp].numQues,
            correct: 0,
            wrong: 0,
            marks: [0, 0],
          });
        }
      }

      for (let res in response) {
        const [x, y, z] = res.split(" ");
        if (response[res].isA || response[res].isMandS) {
          if (getResults.answers[res].marks) {
            if (response[res].ans == getResults.answers[res].ans) {
              sectionDetails[x].components[y].correct++;
              sectionDetails[x].components[y].marks[0] +=
                getResults.answers[res].marks[0];
            } else {
              sectionDetails[x].components[y].wrong++;
              sectionDetails[x].components[y].marks[1] +=
                getResults.answers[res].marks[0];
            }
          }
          else if (getResults.sections[x].components[y].compMarks) {
            if (response[res].ans == getResults.answers[res].ans) {
              sectionDetails[x].components[y].correct++;
              sectionDetails[x].components[y].marks[0] +=
                getResults.sections[x].components[y].compMarks[0];
            } else {
              sectionDetails[x].components[y].wrong++;
              sectionDetails[x].components[y].marks[1] +=
                getResults.sections[x].components[y].compMarks[1];
            }
          }
          else if (getResults.sections[x].sectionMarks) {
            if (response[res].ans == getResults.answers[res].ans) {
              sectionDetails[x].components[y].correct++;
              sectionDetails[x].components[y].marks[0] +=
                getResults.sections[x].sectionMarks[0];
            } else {
              sectionDetails[x].components[y].wrong++;
              sectionDetails[x].components[y].marks[1] +=
                getResults.sections[x].sectionMarks[1];
            }
          }
        }
      }
      
      result.secDet = sectionDetails;

      setResult({ result: result, response: Responses });
    }
  }, [getResults]);

  return [result, setResult];
};
