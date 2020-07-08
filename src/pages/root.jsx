import React from 'react';
import { useTemporaryApi, useGetTemporary, usePostTemporary, useRequest, useMove } from '../hook';
import { Button } from '../components';

export default function Root(){
    const [temporary, apiAction] = useTemporaryApi();
    const [
        {
          data: getData,
          fulfilled: getFulfilled,
          pending: getPending,
          rejected: getRejected,
          error: getError,
        },
        { run: getApi },
      ] = useRequest(apiAction.getApi);
      const [
        {
          data: postData,
          fulfilled: postFulfilled,
          pending: postPending,
          rejected: postRejected,
          error: postError,
        },
        { run: postApi },
      ] = useRequest(apiAction.postApi);
      const [tempState, changeState] = useGetTemporary(getData, getFulfilled, getRejected, getError, getApi);
      usePostTemporary(postData, postFulfilled, postRejected, postError, postApi); 
      useMove(postFulfilled, './');
console.log(postData)
console.log(postFulfilled)



      const clickPost = () => {
        apiAction.postApi(tempState)
      }

      return (
        <div>
            root page
            {(getPending || postPending) ? (
                <div>
                    로딩중...
                    </div>
            ) : (
                <div>
                    <Button onClick={changeState.clickPlusButton}>숫자 늘리기</Button>
                    <Button onClick={clickPost}>data post</Button>
                    <div>
                        state값 : {tempState}
                        <br />
                        redux값 : {temporary}
                    </div>
                    
                </div>
            )} 
        </div>
    )
}