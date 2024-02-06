import React, { FC, useEffect, useState } from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { moviesAPI } from "src/utils/apiUtils";
import { PropsFacts } from "src/types";

const InterestingFacts: FC = () => {
  const { id } = useParams();
  const [facts, setFatcts] = useState<PropsFacts>({ total: 0, items: [] });

  useEffect(() => {
    async function getFacts() {
      try {
        const { data } = await moviesAPI.getFactsId(id as string);
        setFatcts(data);
      } catch (error) {
        console.log(error, "errorFacts");
      }
    }
    getFacts();
  }, [id]);
  return (
    <>
      {facts?.total === 0 ? (
        false
      ) : (
        <section className="section flex h-[300px] overflow-scroll overflow-y-auto overflow-x-auto text-white mb-10">
          <div className="container">
            <h2 className="heading">а знаете ли вы, что...</h2>
            <ul className="list-disc">
              {facts.items?.map((item, i: number) => (
                <li
                  className="text-white list-inside text-customSizeText mb-4"
                  key={i}
                >
                  {parse(item.text.replaceAll(/<a.*?>/g, ""))}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default InterestingFacts;
