interface StatisticsTableProps {
  headers: string[];
  content: string[][];
  page?: number;
  pageSize?: number;
  allowInnerHTML: boolean;
  positionTieBreakerIndex?: number;
  showPositions: boolean;
}

const StatisticsTable = ({
  content,
  headers,
  page = 0,
  pageSize = 0,
  allowInnerHTML = false,
  showPositions,
  positionTieBreakerIndex,
}: StatisticsTableProps) => {
  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered shadow table-condensed">
          <thead className="thead thead-dark">
            <tr>
              {showPositions && (
                <th className="text-center" scope="col">
                  #
                </th>
              )}
              {headers.map((header, i) => (
                <th key={i} className="text-center" scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tbody">
            {content.map((result: string[], i) => (
              <tr key={i}>
                {showPositions && (
                  <th scope="row" className="text-center">
                    {i === 0 ||
                    positionTieBreakerIndex == null ||
                    content[i][positionTieBreakerIndex] !==
                      content[i - 1][positionTieBreakerIndex]
                      ? (page - 1) * pageSize + i + 1
                      : "-"}
                  </th>
                )}
                {result.map((entry, j) => (
                  <td key={j} className="text-center">
                    {/* We allow rendering HTML (eg.: for links) in the statistics (not in the user's query) */}
                    {allowInnerHTML ? (
                      <span dangerouslySetInnerHTML={{ __html: entry }} />
                    ) : (
                      entry
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticsTable;
