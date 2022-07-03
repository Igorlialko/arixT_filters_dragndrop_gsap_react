import {useCallback, useMemo, useState} from "react";


export default function useReverse(sort:string) {
  const [reverse, setReverse] = useState(false);
  const isActiveReverse = useMemo(() => (sort === "name" || sort === "date of birth" || sort === "city"), [sort]);
  const reverseUp = useCallback(() => {
    setReverse(true);
  }, [setReverse]);
  const reverseDown = useCallback(() => {
    setReverse(false);
  }, [setReverse]);
  return {
    reverse,isActiveReverse,
    reverseUp,reverseDown
  };
}