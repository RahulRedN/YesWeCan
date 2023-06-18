import React, { useState } from "react";

import { useGetResult } from "../../hooks/GetResults";
import { useEffect } from "react";

const ResultComponent = ({ classes }) => {
  const [result, setResult] = useGetResult();
  const [details, setDetails] = useState();

  let total = 0, correct = 0, wrong = 0, marks = [0, 0];

  const formatNumber = (number) => {
    return `${String(number[0]).padStart(2, "0")} : ${String(number[1]).padStart(2, "0")} : ${String(number[2]).padStart(2, "0")}`;
  }

  const addTimeHandler = (arr1, arr2) => {
    return [
      arr1[0] +
        arr2[0] +
        Math.floor(
          (arr1[1] + arr2[1] + Math.floor((arr1[2] + arr2[2]) / 60)) / 60
        ),
      (arr1[1] + arr2[1] + Math.floor((arr1[2] + arr2[2]) / 60)) % 60,
      (arr1[2] + arr2[2]) % 60,
    ];
  };
  
  useEffect(() => {
    if (result) {
      const detailsObj = [];
      for (let sec in result.response.sectionDetails) {
        detailsObj.push({
          title: result.response.sectionDetails[sec].title,
          components: [],
        });
        for (let comp in result.response.sectionDetails[sec].components) {
          detailsObj[sec].components.push({
            title: result.response.sectionDetails[sec].components[comp].title,
            numQues:
              result.response.sectionDetails[sec].components[comp].numQues,
            isA: 0,
            isMandS: 0,
            isM: 0,
            isNA: 0,
            timeSpent: [0, 0, 0],
          });
        }
      }

      for (let key in result.response.resObj) {
        const [x, y, z] = key.split(" ");
        if (result.response.resObj[key].isA) {
          detailsObj[x].components[y].isA++;
        } else if (result.response.resObj[key].isNA) {
          detailsObj[x].components[y].isNA++;
        } else if (result.response.resObj[key].isM) {
          detailsObj[x].components[y].isM++;
        } else if (result.response.resObj[key].isMandS) {
          detailsObj[x].components[y].isMandS++;
        }
        detailsObj[x].components[y].timeSpent = addTimeHandler(
          [...detailsObj[x].components[y].timeSpent],
          [...result.response.resObj[key].timeSpent]
        );
      }
      setDetails(detailsObj);
    }
  }, [result]);
  return (
    <>
      <div className={classes.examSummary}>
        <table>
          <thead>
            <tr>
              <th colSpan={9}>Exam Summary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Section Name</th>
              <th>Module Name</th>
              <th># Questions</th>
              <th># Answered</th>
              <th># Marked and Answered</th>
              <th># Marked for Review</th>
              <th># Not Answered</th>
              <th># Not Visited</th>
              <th>Time Spent</th>
            </tr>
          </tbody>
          {details?.map((sec, secidx) => (
            <tbody key={secidx}>
              {sec.components.map((comp, compIdx) => (
                <tr key={`${secidx} ${compIdx}`}>
                  {compIdx == 0 ? (
                    <td rowSpan={sec.components.length}>{sec.title}</td>
                  ) : (
                    ""
                  )}
                  <td>{comp.title}</td>
                  <td>{comp.numQues}</td>
                  <td>{comp.isA}</td>
                  <td>{comp.isMandS}</td>
                  <td>{comp.isM}</td>
                  <td>{comp.isNA}</td>
                  <td>
                    {comp.numQues -
                      (comp.isA + comp.isMandS + comp.isM + comp.isNA)}
                  </td>
                  <td>
                    <span>{formatNumber([...comp.timeSpent])}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <div className={classes.resultTable}>
        <table>
          <thead>
            <tr>
              <th colSpan={9}>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Section Name</th>
              <th>Module Name</th>
              <th>No of Question</th>
              <th>No of Correct</th>
              <th>No of Wrong</th>
              <th>Correct Marks</th>
              <th>Wrong Marks</th>
              <th>Total Marks</th>
              <th>Accuracy Percentage</th>
            </tr>
          </tbody>
          {result.result.secDet?.map((sec, secIdx) => {
            return (
              <tbody key={secIdx}>
                {sec.components.map((comp, compIdx) => {
                  total += comp.numQues;
                  correct += comp.correct;
                  wrong += comp.wrong;
                  marks[0] += comp.marks[0];
                  marks[1] += comp.marks[1];
                  return (
                    <tr key={`${secIdx} ${compIdx}`}>
                      {compIdx == 0 ? (
                        <td rowSpan={sec.components.length}>{sec.title}</td>
                      ) : (
                        ""
                      )}
                      <td>{comp.title}</td>
                      <td>{comp.numQues}</td>
                      <td>{comp.correct}</td>
                      <td>{comp.wrong}</td>
                      <td>{comp.marks[0]}</td>
                      <td>{comp.marks[1]}</td>
                      <td>{comp.marks[0] - comp.marks[1]}</td>
                      {comp.correct + comp.wrong == 0 ? (
                        <td>0.00</td>
                      ) : (
                        <td>
                          {(comp.correct / (comp.correct + comp.wrong)).toFixed(
                            2
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            );
          })}
          <tbody>
            <tr>
              <td colSpan={2}>Total: </td>
              <td> {total}</td>
              <td>{correct}</td>
              <td>{wrong}</td>
              <td>{marks[0]}</td>
              <td>{marks[1]}</td>
              <td>{marks[0] - marks[1]}</td>
              {correct + wrong == 0 ? (
                <td>0.00</td>
              ) : (
                <td>{(correct / (correct + wrong)).toFixed(2)}</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ResultComponent;
