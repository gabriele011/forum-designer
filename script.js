const room = document.getElementById('room');
let isDraggingRoom = false;
let startX;
let scrollLeft = 0;

room.addEventListener('mousedown', (e) => {
  isDraggingRoom = true;
  startX = e.pageX - scrollLeft;
});
document.addEventListener('mouseup', () => isDraggingRoom = false);
document.addEventListener('mousemove', (e) => {
  if (!isDraggingRoom) return;
  scrollLeft = e.pageX - startX;
  room.style.transform = `translateX(${scrollLeft}px)`;
});

room.addEventListener('touchstart', (e) => {
  isDraggingRoom = true;
  startX = e.touches[0].pageX - scrollLeft;
});
room.addEventListener('touchend', () => isDraggingRoom = false);
room.addEventListener('touchmove', (e) => {
  if (!isDraggingRoom) return;
  scrollLeft = e.touches[0].pageX - startX;
  room.style.transform = `translateX(${scrollLeft}px)`;
});

document.querySelectorAll('.catalog-item').forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('type', e.target.dataset.type);
    e.dataTransfer.setDragImage(e.target, 50, 50);
  });
});

room.addEventListener('dragover', (e) => e.preventDefault());

room.addEventListener('drop', (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  const img = document.createElement('img');
  img.src = `${type}.png`;
  img.className = 'furniture';
  img.style.left = (e.pageX - room.getBoundingClientRect().left) + 'px';
  img.style.top = (e.pageY - room.getBoundingClientRect().top) + 'px';
  room.appendChild(img);
});
