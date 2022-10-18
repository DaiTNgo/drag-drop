import {useRef, useState} from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
    const [isDragging, setIsDragging] = useState(false);
    const [list, setList] = useState([
        {name: 'Study', displayOrder: 1},
        {name: 'Learn', displayOrder: 2},
        {name: 'Eat', displayOrder: 3},
        {name: 'a', displayOrder: 4},
        {name: 'b', displayOrder: 5},
        {name: 'c', displayOrder: 6},
    ]);

    const todos = ['Study', 'Learn', 'Eat'];

    const currentRef = useRef(null);
    const currentItemRef = useRef(null);

    function handleDragStart(e, item) {
        currentRef.current = e.target;
        if (item) {
            currentItemRef.current = item;
            setTimeout(() => {
                setIsDragging(true);
            }, 0);
        }
    }

    const handleDragEnd = () => {
        setIsDragging(false);
    };
    const onDrop = (e,item) => {
        e.preventDefault();
        console.log('onDrop',item);
    };
    const onDragOver = (e) => {
        e.preventDefault();
        console.log('onDragOver');
    };

    const onDragEnter = (e, item) => {
        if (currentRef.current !== e.target && currentRef.current.classList.contains('drag')) {
            setList((prev) => {
                const repIndex = prev.findIndex((i) => i.name === item?.name);

                const secondArr = JSON.parse(JSON.stringify(prev)).filter(
                    (i) => i.name !== currentItemRef.current?.name
                );
                secondArr.splice(repIndex, 0, currentItemRef.current);

                return secondArr;
            });
        }
    };

    return (
        <div className='App'>
            <ul
                style={{
                    border: '1px solid white',
                    marginBottom: '20px',
                }}
            >
                {list.map((item) => {
                    const {name, displayOrder} = item;
                    return (
                        <li
                            className={'drag'}
                            style={{
                                cursor: 'move',
                                width: '100px',
                                height: '100px',
                                border: '1px solid red',
                                backgroundColor:
                                    isDragging &&
                                    currentItemRef.current?.displayOrder === displayOrder
                                        ? 'blue'
                                        : null,
                            }}
                            key={displayOrder}
                            draggable
                            onDragStart={(e) => {
                                handleDragStart(e, item);
                            }}
                            onDragEnter={(e) => onDragEnter(e, item)}
                            onDragEnd={() => handleDragEnd(name)}

                            onDrop={(e) =>onDrop(e,item)}
                            onDragOver={onDragOver}
                        >
                            {isDragging &&
                            currentItemRef.current?.displayOrder === displayOrder ? (
                                <div/>
                            ) : (
                                name
                            )}
                        </li>
                    );
                })}
            </ul>
            <div></div>
            <div
                style={{
                    marginTop: '20px',
                    border: '2px solid blue',
                    width: '200px',
                    height: '200px',
                }}

            >
                {todos.map(item => {
                    return (
                            <div
                            style={{
                                cursor: 'move',
                                width: '100px',
                                height: '100px',
                                border: '1px solid red',
                            }}
                            draggable
                            onDragStart={(e) => {
                                handleDragStart(e);
                            }}
                        >
                            {item}
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default App;
