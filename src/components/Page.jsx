import {  useState } from 'react';
import Article from '../Content_component/Article';
import Content from '../Content_component/Content';
import Footer from './Footer';
import Header from './Header';
import Create from '../Content_component/Create';
import Update from '../Content_component/Update';

// { isDark, setIsDark }
const Page = () => {
    // const { isDark } = useContext(ThemeContext);
    const [mode, setMode] = useState('Welcome');
    const [id, setId] = useState(null); // 초기값 없음
    const [nextId, setNextId] = useState(4);
    const [topics, setTopics] = useState([
        { id: 1, title: '정방폭포', body: '주소: 제주특별자치도 서귀포시 칠십리로214번길 37' },
        { id: 2, title: '성산 일출봉', body: '주소: 제주특별자치도 서귀포시 성산읍 성산리 일출로 284-12' },
        { id: 3, title: '오설록 티 뮤지엄', body: '주소: 제주특별자치도 서귀포시 안덕면 신화역사로 15' },
    ]);

    let content = null;
    if (mode === 'Welcome') {
        content = <Article title="Welcome" body="You can CRUD"></Article>;
    } else if (mode === 'Read') {
        let title,
            body = null;
        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) { // id = 현재 선택된 것
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = 
        <>
        <Article title={title} body={body}></Article>
        <li className="update">
                <a
                    href={'/update/' + id}
                    onClick={(e) => {
                        e.preventDefault();
                        setMode('Update');}}
                >
                    Update
                </a>
            </li>
        <li className='delete'>
            <input className='deleteBtn' type='button' value='Delete' onClick={e => {
                const newTopics= []; // newTopics라는 빈 배열 생성
                for(let i=0; i<topics.length; i++){
                    if(topics[i].id !== id) {
                        newTopics.push(topics[i]) 
                        // 선택된 id값과 일치하지않는 id 값만 빈 배열에 push함
                    }
                }
                setTopics(newTopics);
            }} />

        </li>
        </>
    } else if (mode === 'Create') {
        content = (
            <Create
                onCreate={(_title, _body) => {
                    const newTopic = { id: nextId, title: _title, body: _body };
                    const newTopics = [...topics];
                    newTopics.push(newTopic);
                    setTopics(newTopics);
                    setMode('Read'); // 해야만 읽기모드로 제목과 내용
                    setId(nextId);
                    setNextId(nextId + 1);
                    console.log(nextId, _title, _body);
                }}
            ></Create>
        );
    } else if (mode === 'Update') {
        let title,
            body = null;
        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = 
            <Update
                title={title}
                body={body}
                onUpdate={(title, body) => {
                    const newTopics = [...topics];
                    const updatedTopic = { id: id, title: title, body: body }; // 수정된 토픽
                    for (let i = 0; i < newTopics.length; i++) {
                        if (newTopics[i].id === id) {
                            newTopics[i] = updatedTopic;
                            break;
                        }
                    }
                    setTopics(newTopics);
                    setMode('Read');
                }}
            ></Update>
    } else if(mode === 'Delete') {
        
    }
    return (
        <div className="page">
            {/* <Header isDark={isDark} />
            <Content isDark={isDark} />
            <Footer isDark={isDark} setIsDark={setIsDark} /> */}
            <Header
                title="Welcome"
                onChangeMode={function () {
                    setMode('Welcome');
                }}
            />
            {/* setMode prop으로 내려주기 => Content.jsx에서 쓸 수 있다.*/}
            <Content content={content} setMode={setMode} setId={setId} topics={topics} />
            <Footer />
        </div>
    );
};

export default Page;
