import React, { useState, useEffect } from 'react';
import { Home, PlusSquare, User, Heart, MessageCircle, Send, Plus, Sun, Moon, BookOpen } from 'lucide-react';

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
    commentList: [
      { id: 101, user: "이소윤", content: "와 대단해요!! 저도 처음엔 진짜 힘들었는데 ㅎㅎ", timestamp: "25분 전" },
      { id: 102, user: "박지성", content: "축하드립니다! 어떤 API 쓰셨나요?", timestamp: "20분 전" }
    ],
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
    commentList: [
      { id: 201, user: "김다은", content: "다들 힘내세요!! 응원합니다 🔥", timestamp: "40분 전" }
    ],
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
    commentList: [],
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
    commentList: [],
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
    commentList: [],
    category: "#오늘의배움",
    timestamp: "8시간 전"
  }
];

const categories = ["전체", "#오늘의배움", "#프로젝트진행", "#고민상담", "#자유"];

function App() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('vibe_posts');
    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });
  const [currentTab, setCurrentTab] = useState('home'); // 'home', 'write', 'profile'
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '#오늘의배움' });
  const [guestbookEntries, setGuestbookEntries] = useState(() => {
    const saved = localStorage.getItem('vibe_guestbook');
    return saved ? JSON.parse(saved) : [];
  });
  const [newEntry, setNewEntry] = useState({ name: '', message: '' });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [commentInputs, setCommentInputs] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('vibe_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('vibe_guestbook', JSON.stringify(guestbookEntries));
  }, [guestbookEntries]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

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

  const handleCommentSubmit = (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: currentUser.name,
      content: commentText.trim(),
      timestamp: new Date().toLocaleString('ko-KR', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: (post.commentList?.length || 0) + 1,
          commentList: [newComment, ...(post.commentList || [])]
        };
      }
      return post;
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
  };

  const handleAction = (type, postId) => {
    if (type === '댓글') {
      setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
      return;
    }
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
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      liked: false,
      comments: 0,
      commentList: [],
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
        padding: '20px 0', 
        overflowX: 'auto', 
        display: 'flex', 
        gap: '12px', 
        paddingLeft: '20px',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        backgroundColor: 'var(--secondary-color)',
        marginBottom: '4px',
        position: 'sticky',
        top: '64px',
        zIndex: 90
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`category-btn ${activeCategory === cat ? 'active' : 'inactive'}`}
            style={{ border: 'none' }} // remove default border if any
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card" style={{ 
            boxShadow: 'var(--shadow-soft)'
          }}>
            {/* User Info Header: Profile Avatar + Author + Time */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', gap: '12px' }}>
              <img 
                src={post.avatar} 
                alt={post.user} 
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-color)', backgroundColor: 'var(--gray-light)' }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-color)' }}>{post.user}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1px' }}>{post.timestamp}</span>
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
                  color={post.liked ? "var(--like-color)" : "var(--text-color)"} 
                  fill={post.liked ? "var(--like-color)" : "none"} 
                  strokeWidth={2} 
                  className={post.isAnimating ? 'heart-animate' : ''}
                />
                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: post.liked ? 'var(--like-color)' : 'var(--text-color)' }}>{post.likes}</span>
              </div>
              <div 
                onClick={() => handleAction('댓글', post.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <MessageCircle size={26} color="var(--text-color)" strokeWidth={2} />
                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-color)' }}>{post.commentList?.length || 0}</span>
              </div>
              <Send 
                onClick={() => handleAction('공유', post.id)}
                size={26} color="var(--text-color)" strokeWidth={2} style={{ cursor: 'pointer' }} 
              />
            </div>

            {/* Post Content */}
            <div style={{ padding: '4px 16px 24px 16px' }}>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-color)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {post.title ? <h3 style={{marginBottom: '8px', fontSize: '1.1rem'}}>{post.title}</h3> : null}
                {post.content}
              </div>
              <div style={{ 
                display: 'inline-block',
                color: 'var(--primary-color)', 
                fontSize: '0.8rem', 
                marginTop: '14px', 
                fontWeight: '700',
                padding: '6px 12px',
                backgroundColor: 'var(--tag-bg)',
                borderRadius: '20px'
              }}>
                {post.category}
              </div>
            </div>

            {/* Comments Section */}
            {(expandedComments[post.id] || (post.commentList && post.commentList.length > 0)) && (
              <div className="comment-section" style={{ 
                padding: '0 16px 16px 16px',
                borderTop: '1px solid var(--border-color)',
                backgroundColor: 'var(--secondary-color)'
              }}>
                {post.commentList && post.commentList.length > 0 && (
                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {post.commentList.slice(0, expandedComments[post.id] ? post.commentList.length : 2).map(comment => (
                      <div key={comment.id} style={{ display: 'flex', gap: '8px', fontSize: '0.85rem' }}>
                        <span style={{ fontWeight: '700', color: 'var(--text-color)', whiteSpace: 'nowrap' }}>{comment.user}</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: 'var(--text-color)' }}>{comment.content}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{comment.timestamp}</span>
                        </div>
                      </div>
                    ))}
                    {!expandedComments[post.id] && post.commentList.length > 2 && (
                      <button 
                        onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: true }))}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'left', padding: '4px 0', cursor: 'pointer' }}
                      >
                        댓글 {post.commentList.length - 2}개 더 보기...
                      </button>
                    )}
                  </div>
                )}

                {/* Comment Input */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px' }}>
                  <img 
                    src={currentUser.avatar} 
                    alt="Current User" 
                    style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--gray-light)' }} 
                  />
                  <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      placeholder="댓글 달기..." 
                      className="comment-input-field"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                      onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                      style={{
                        width: '100%',
                        padding: '10px 40px 10px 12px',
                        borderRadius: '20px',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.85rem',
                        outline: 'none',
                        backgroundColor: 'var(--gray-light)',
                        color: 'var(--text-color)'
                      }}
                    />
                    <button 
                      onClick={() => handleCommentSubmit(post.id)}
                      disabled={!commentInputs[post.id]?.trim()}
                      style={{ 
                        position: 'absolute', 
                        right: '12px', 
                        background: 'none', 
                        border: 'none', 
                        color: commentInputs[post.id]?.trim() ? 'var(--primary-color)' : 'var(--text-muted)',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      게시
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  const renderWritePost = () => (
    <div style={{ backgroundColor: 'var(--secondary-color)', minHeight: '100%', padding: '20px' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text-color)' }}>새 게시글 작성</h2>
      
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
            border: '1px solid var(--border-color)',
            fontSize: '1rem',
            outline: 'none',
            backgroundColor: 'var(--gray-light)',
            color: 'var(--text-color)'
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
              padding: '16px',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--border-color)',
              fontSize: '1rem',
              minHeight: '200px',
              outline: 'none',
              resize: 'none',
              fontFamily: 'inherit',
              backgroundColor: 'var(--gray-light)',
              color: 'var(--text-color)',
              transition: 'var(--transition)'
            }}
          />
          <div style={{ 
            position: 'absolute', 
            bottom: '12px', 
            right: '12px', 
            fontSize: '0.75rem', 
            color: newPost.content.length === 300 ? 'var(--primary-color)' : 'var(--text-muted)' 
          }}>
            {newPost.content.length} / 300
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', marginBottom: '10px', color: 'var(--text-color)' }}>카테고리</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {categories.slice(1).map(cat => (
              <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="category" 
                  value={cat} 
                  checked={newPost.category === cat}
                  onChange={() => setNewPost({...newPost, category: cat})}
                  style={{ accentColor: 'var(--primary-color)' }}
                />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-color)' }}>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          onClick={handlePostSubmit}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '1.1rem',
            marginTop: '24px'
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
      <div style={{ backgroundColor: 'var(--body-bg)', minHeight: '100%' }}>
        {/* Profile Header */}
        <div style={{ backgroundColor: 'var(--secondary-color)', padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
          <img 
            src={currentUser.avatar} 
            alt="My Profile" 
            style={{ width: '90px', height: '90px', borderRadius: '50%', border: '2px solid var(--border-color)', marginBottom: '16px', backgroundColor: 'var(--gray-light)' }} 
          />
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '8px' }}>{currentUser.name}</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>{currentUser.bio}</p>

          {/* Stats */}
          <div style={{ display: 'flex', width: '100%', gap: '16px' }}>
            <div style={{ flex: 1, backgroundColor: 'var(--gray-light)', borderRadius: 'var(--border-radius)', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'var(--transition)', cursor: 'default' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-color)' }}>{myPosts.length}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>게시글</span>
            </div>
            <div style={{ flex: 1, backgroundColor: 'var(--gray-light)', borderRadius: 'var(--border-radius)', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'var(--transition)', cursor: 'default' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-color)' }}>{totalLikes}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>좋아요</span>
            </div>
          </div>
        </div>

        {/* My Posts Area */}
        <div style={{ padding: '20px 16px 8px', backgroundColor: 'var(--secondary-color)', borderBottom: '1px solid var(--border-color)', marginTop: '8px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-color)' }}>내가 쓴 글</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'var(--secondary-color)' }}>
          {myPosts.length > 0 ? myPosts.map(post => (
            <div key={post.id} style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
              <img src={post.image} alt="post" style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-color)', marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.content}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Heart size={12} color={post.liked ? "var(--like-color)" : "var(--text-muted)"} fill={post.liked ? "var(--like-color)" : "none"} /> {post.likes}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageCircle size={12} /> {post.commentList?.length || 0}</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
            </div>
          )) : (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              작성한 게시글이 없습니다.
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGuestbook = () => {
    const handleGuestbookSubmit = (e) => {
      e.preventDefault();
      if (!newEntry.name.trim() || !newEntry.message.trim()) {
        alert("이름과 메시지를 모두 입력해주세요!");
        return;
      }
      const entry = {
        id: Date.now(),
        name: newEntry.name,
        message: newEntry.message,
        timestamp: new Date().toLocaleString('ko-KR', { 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setGuestbookEntries([entry, ...guestbookEntries]);
      setNewEntry({ name: '', message: '' });
    };

    return (
      <div style={{ backgroundColor: 'var(--body-bg)', minHeight: '100%' }}>
        <div style={{ padding: '20px 20px 10px', backgroundColor: 'var(--secondary-color)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '8px' }}>방명록</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>따뜻한 한마디를 남겨주세요 ✨</p>
        </div>

        <form className="guestbook-form" onSubmit={handleGuestbookSubmit}>
          <input 
            type="text" 
            placeholder="이름" 
            className="guestbook-input"
            value={newEntry.name}
            onChange={(e) => setNewEntry({...newEntry, name: e.target.value})}
          />
          <textarea 
            placeholder="남기고 싶은 메시지를 입력하세요" 
            className="guestbook-textarea"
            value={newEntry.message}
            onChange={(e) => setNewEntry({...newEntry, message: e.target.value})}
          />
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>
            작성하기
          </button>
        </form>

        <div style={{ marginTop: '8px' }}>
          {guestbookEntries.length > 0 ? (
            guestbookEntries.map(entry => (
              <div key={entry.id} className="guestbook-entry">
                <div className="guestbook-entry-header">
                  <span className="guestbook-entry-name">{entry.name}</span>
                  <span className="guestbook-entry-time">{entry.timestamp}</span>
                </div>
                <div className="guestbook-entry-message">{entry.message}</div>
              </div>
            ))
          ) : (
            <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--secondary-color)' }}>
              <BookOpen size={40} color="var(--nav-icon-inactive)" style={{ marginBottom: '16px' }} strokeWidth={1.5} />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>첫 번째 메시지를 남겨보세요!</p>
            </div>
          )}
        </div>
      </div>
    );
  };


  return (
    <div className="mobile-container">
      <header className="header">
        <h1>VibeFeed</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={toggleTheme} className="theme-toggle" title={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}>
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button 
            onClick={() => setCurrentTab('write')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
          >
            <Plus size={28} color="var(--primary-color)" />
          </button>
        </div>
      </header>

      <main className="main-content">
        {currentTab === 'home' && renderHomeFeed()}
        {currentTab === 'write' && renderWritePost()}
        {currentTab === 'guestbook' && renderGuestbook()}
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
          onClick={() => setCurrentTab('guestbook')}
          className={`nav-item ${currentTab === 'guestbook' ? 'active' : ''}`} style={{ cursor: 'pointer' }}
        >
          <BookOpen size={26} />
          <span style={{ marginTop: '4px' }}>방명록</span>
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
