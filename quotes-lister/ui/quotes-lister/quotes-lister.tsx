import React, { ReactNode, useState } from 'react';
import {useEffect} from 'react';
import {ServiceResponseType, QuoteType, ServiceResponseMocks} from '@deleteman/quotes-lister.shared-types';


export function QuotesLister(props: {mock?: boolean}) {
  let [items, setItems] = useState([])
  let [error, setError] = useState(null)

  useEffect(() => {
    if(props.mock) {
      return setItems(ServiceResponseMocks)
    }

    fetch("http://localhost:8000")
      .then(res => res.json())
      .then(
        (result: ServiceResponseType) => {
          setItems(result as ServiceResponseType);
        },
        (error) => {
          setError(error);
        }
      )
  }, [])

  if(error) {
    return (<div >
        <p>Error found: {error.message}</p>
    </div>)
  }
  return (
    <div>
      {renderPeople(items)}
    </div>
  );
}

function renderPeople(ppl: ServiceResponseType): ReactNode[] {
  return ppl.map( (quote: QuoteType) => {
    return <div key={quote.author}>
      <p><strong>Quote:</strong> <i>{quote.text} </i></p>
      <p><strong>Author:</strong> {quote.author} </p>
    </div>
  })
}