import { createServer } from './servers/src/everything/dist/everything.js';

const run = async () => {
  const { server } = await createServer();

  // 1. 할일 추가
  const createResult = await server.request({
    method: 'tools/call',
    params: {
      name: 'create_todo',
      arguments: {
        name: '바이브코딩 연습하기',
        description: '영남대학교 소프트웨어중심대학주관'
      }
    }
  });
  console.log('할일 추가 결과:', createResult.content[0].text);

  // 할일 목록 조회
  const listResult = await server.request({
    method: 'tools/call',
    params: {
      name: 'list_todos',
      arguments: {}
    }
  });
  console.log('현재 할일 목록:', listResult.content[0].text);
};

run(); 