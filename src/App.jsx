import React, { useState } from 'react';
import { Home, PlusSquare, User, Heart, MessageCircle, Send, Plus } from 'lucide-react';

const initialPosts = [
  {
    id: 1,
    user: "김다은",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daeun",
    image: "https://picsum.photos/id/1/500/500",
    content: "오늘 드디어 첫 API 연결 성공했어요! 🥳 비전공자라 걱정 많았는데 하나씩 해내니 뿌듯하네요. #오늘의배움",
    likes: 15,
    liked: false,
    comments: 4,
    category: "#오늘의배움",
    timestamp: "30분 전"
  },
  {
    id: 2,
    user: "이소윤",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Soyun",
    image: "https://picsum.photos/id/2/500/500",
    content: "팀원들과 밤샘 코딩 중... ☕️ 힘들지만 같이 하니까 힘이 나요! 우리 팀 화이팅!! #프로젝트진행",
    likes: 32,
    liked: true,
    comments: 12,
    category: "#프로젝트진행",
    timestamp: "1시간 전"
  },
  {
    id: 3,
    user: "박지성",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jisung",
    image: "https://picsum.photos/id/3/500/500",
    content: "UI 디자인 툴 어떤 거 쓰시나요? 피그마 연습 중인데 팁 좀 공유해주세요! 🎨 #고민상담",
    likes: 8,
    liked: false,
    comments: 6,
    category: "#고민상담",
    timestamp: "3시간 전"
  },
  {
    id: 4,
    user: "최수진",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sujin",
    image: "https://picsum.photos/id/4/500/500",
    content: "빌더톤 끝나고 맛있는 거 먹으러 갈 생각에 벌써 설레네요. 🍖 다들 조금만 더 힘냅시다! #자유",
    likes: 21,
    liked: false,
    comments: 2,
    category: "#자유",
    timestamp: "5시간 전"
  },
  {
    id: 5,
    user: "정하늘",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Haneul",
    image: "https://picsum.photos/id/5/500/500",
    content: "드디어 CSS 레이아웃 잡는 법 깨달았습니다... 역시 반복만이 살길이네요. 😅 #오늘의배움",
    likes: 19,
    liked: false,
    comments: 5,
    category: "#오늘의배움",
    timestamp: "8시간 전"
  }
];

const categories = ["전체", "#오늘의배움", "#프로젝트진행", "#고민상담", "#자유"];

function App() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [posts, setPosts] = useState(initialPosts);
  const [currentTab, setCurrentTab] = useState('home'); // 'home', 'write', 'profile'
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '#오늘의배움' });

  // Assume the logged in user is "김다은"
  const currentUser = {
    name: "김다은",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daeun",
    bio: "프론트엔드 개발자를 꿈꾸는 예비 개발자입니다! 💻",
  };

  const filteredPosts = activeCategory === "전체" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  const handleLike = (postId) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          isAnimating: true
        };
      }
      return post;
    }));

    setTimeout(() => {
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, isAnimating: false };
        }
        return post;
      }));
    }, 300);
  };

  const handleAction = (type) => {
    alert(`${type} 기능은 준비 중입니다!`);
  };

  const handlePostSubmit = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    const post = {
      id: Date.now(),
      user: currentUser.name,
      avatar: currentUser.avatar,
      image: `https://picsum.photos/id/${Math.floor(Math.random() * 100) + 10}/500/500`, // random image
      content: newPost.content,
      likes: 0,
      liked: false,
      comments: 0,
      category: newPost.category,
      timestamp: "방금 전"
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: '#오늘의배움' });
    setCurrentTab('home');
  };

  // ----- Render Helpers ----- //

  const renderHomeFeed = () => (
    <>
      {/* Category Filter */}
      <div style={{ 
        padding: '16px 0', 
        overflowX: 'auto', 
        display: 'flex', 
        gap: '10px', 
        paddingLeft: '16px',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        backgroundColor: '#FFFFFF',
        marginBottom: '8px'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 18px',
              borderRadius: '25px',
              border: activeCategory === cat ? 'none' : '1px solid #EEE',
              backgroundColor: activeCategory === cat ? '#FF6B6B' : '#F8F9FA',
              color: activeCategory === cat ? 'white' : '#666',
              fontSize: '0.85rem',
              fontWeight: activeCategory === cat ? '600' : '400',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredPosts.map(post => (
          <div key={post.id} style={{ 
            backgroundColor: '#FFFFFF', 
            borderBottom: '1px solid #EEE',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            {/* User Info Header: Profile Avatar + Author + Time */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', gap: '12px' }}>
              <img 
                src={post.avatar} 
                alt={post.user} 
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #F0F0F0', backgroundColor: '#F9F9F9' }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#222' }}>{post.user}</span>
                <span style={{ fontSize: '0.75rem', color: '#999', marginTop: '1px' }}>{post.timestamp}</span>
              </div>
            </div>

            {/* Post Image */}
            <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
              <img 
                src={post.image} 
                alt="post content" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Interactions Box */}
            <div style={{ padding: '14px 16px 8px 16px', display: 'flex', gap: '18px' }}>
              <div 
                onClick={() => handleLike(post.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <Heart 
                  size={26} 
                  color={post.liked ? "#FF6B6B" : "#444"} 
                  fill={post.liked ? "#FF6B6B" : "none"} 
                  strokeWidth={2} 
                  className={post.isAnimating ? 'heart-animate' : ''}
                />
                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: post.liked ? '#FF6B6B' : '#444' }}>{post.likes}</span>
              </div>
              <div 
                onClick={() => handleAction('댓글')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <MessageCircle size={26} color="#444" strokeWidth={2} />
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{post.comments}</span>
              </div>
              <Send 
                onClick={() => handleAction('공유')}
                size={26} color="#444" strokeWidth={2} style={{ cursor: 'pointer' }} 
              />
            </div>

            {/* Post Content */}
            <div style={{ padding: '0 16px 20px 16px' }}>
              <div style={{ fontSize: '0.92rem', color: '#333', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                {post.id === Date.now() ? <h3 style={{marginBottom: '4px'}}>{post.title}</h3> : null} {/* Only for new posts */}
                {post.content}
              </div>
              <div style={{ 
                display: 'inline-block',
                color: '#FF6B6B', 
                fontSize: '0.85rem', 
                marginTop: '10px', 
                fontWeight: '600',
                padding: '4px 8px',
                backgroundColor: '#FFF0F0',
                borderRadius: '4px'
              }}>
                {post.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderWritePost = () => (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100%', padding: '20px' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '20px', color: '#222' }}>새 게시글 작성</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input 
          type="text" 
          placeholder="제목을 입력하세요" 
          value={newPost.title}
          onChange={(e) => setNewPost({...newPost, title: e.target.value})}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '8px',
            border: '1px solid #DDD',
            fontSize: '1rem',
            outline: 'none',
          }}
        />
        
        <div style={{ position: 'relative' }}>
          <textarea
            placeholder="어떤 감정을 나누고 싶으신가요?"
            value={newPost.content}
            maxLength={300}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              border: '1px solid #DDD',
              fontSize: '1rem',
              minHeight: '200px',
              outline: 'none',
              resize: 'none',
              fontFamily: 'inherit'
            }}
          />
          <div style={{ 
            position: 'absolute', 
            bottom: '12px', 
            right: '12px', 
            fontSize: '0.75rem', 
            color: newPost.content.length === 300 ? '#FF6B6B' : '#999' 
          }}>
            {newPost.content.length} / 300
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', marginBottom: '10px' }}>카테고리</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {categories.slice(1).map(cat => (
              <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="category" 
                  value={cat} 
                  checked={newPost.category === cat}
                  onChange={() => setNewPost({...newPost, category: cat})}
                  style={{ accentColor: '#FF6B6B' }}
                />
                <span style={{ fontSize: '0.9rem', color: '#444' }}>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          onClick={handlePostSubmit}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#FF6B6B',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '700',
            marginTop: '20px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          게시하기
        </button>
      </div>
    </div>
  );

  const renderProfile = () => {
    const myPosts = posts.filter(p => p.user === currentUser.name);
    const totalLikes = myPosts.reduce((acc, curr) => acc + curr.likes, 0);

    return (
      <div style={{ backgroundColor: '#F8F9FA' }}>
        {/* Profile Header */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #EEE' }}>
          <img 
            src={currentUser.avatar} 
            alt="My Profile" 
            style={{ width: '90px', height: '90px', borderRadius: '50%', border: '2px solid #EEE', marginBottom: '16px', backgroundColor: '#F9F9F9' }} 
          />
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#222', marginBottom: '8px' }}>{currentUser.name}</h2>
          <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '24px' }}>{currentUser.bio}</p>

          {/* Stats */}
          <div style={{ display: 'flex', width: '100%', gap: '16px' }}>
            <div style={{ flex: 1, backgroundColor: '#F8F9FA', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FF6B6B' }}>{myPosts.length}</span>
              <span style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>게시글</span>
            </div>
            <div style={{ flex: 1, backgroundColor: '#F8F9FA', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FF6B6B' }}>{totalLikes}</span>
              <span style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>받은 좋아요</span>
            </div>
          </div>
        </div>

        {/* My Posts Area */}
        <div style={{ padding: '20px 16px 8px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #EEE', marginTop: '8px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#333' }}>내가 쓴 글</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#FFFFFF' }}>
          {myPosts.length > 0 ? myPosts.map(post => (
            <div key={post.id} style={{ padding: '16px', borderBottom: '1px solid #F0F0F0', display: 'flex', gap: '12px' }}>
              <img src={post.image} alt="post" style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#222', marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.content}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: '#888' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={12} /> {post.likes}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageCircle size={12} /> {post.comments}</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
            </div>
          )) : (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
              작성한 게시글이 없습니다.
            </div>
          )}
        </div>
      </div>
    );
  };


  return (
    <div className="mobile-container">
      <header className="header" style={{ padding: '0 20px' }}>
        <h1 style={{ color: '#FF6B6B', fontSize: '1.6rem', letterSpacing: '-0.5px' }}>VibeFeed</h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button 
            onClick={() => setCurrentTab('write')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <Plus size={28} color="#333" />
          </button>
        </div>
      </header>

      <main className="main-content">
        {currentTab === 'home' && renderHomeFeed()}
        {currentTab === 'write' && renderWritePost()}
        {currentTab === 'profile' && renderProfile()}
      </main>

      <nav className="bottom-nav">
        <div 
          onClick={() => setCurrentTab('home')}
          className={`nav-item ${currentTab === 'home' ? 'active' : ''}`} style={{ cursor: 'pointer' }}
        >
          <Home size={26} />
          <span style={{ marginTop: '4px' }}>홈</span>
        </div>
        <div 
          onClick={() => setCurrentTab('write')}
          className={`nav-item ${currentTab === 'write' ? 'active' : ''}`} style={{ cursor: 'pointer' }}
        >
          <PlusSquare size={26} />
          <span style={{ marginTop: '4px' }}>글쓰기</span>
        </div>
        <div 
          onClick={() => setCurrentTab('profile')}
          className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`} style={{ cursor: 'pointer' }}
        >
          <User size={26} />
          <span style={{ marginTop: '4px' }}>프로필</span>
        </div>
      </nav>
    </div>
  );
}

export default App;
