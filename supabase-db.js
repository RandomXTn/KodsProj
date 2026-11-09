// Supabase Database Layer for ELORA Accessories
// Handles all database operations with localStorage fallback

const SupabaseDB = {
  // Check if Supabase is enabled and configured
  isEnabled() {
    return window.ELORA_SUPABASE?.enabled && 
           window.ELORA_SUPABASE?.client &&
           window.ELORA_SUPABASE?.url !== 'YOUR_SUPABASE_URL';
  },

  // Get Supabase client
  getClient() {
    return window.ELORA_SUPABASE?.client;
  },

  // ============================================
  // PRODUCTS
  // ============================================
  
  async getProducts() {
    if (!this.isEnabled()) {
      // Fallback to local products array
      return products;
    }

    try {
      const { data, error } = await this.getClient()
        .from('products')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return products; // Fallback
    }
  },

  async getProduct(slug) {
    if (!this.isEnabled()) {
      return products.find(p => p.url === slug);
    }

    try {
      const { data, error } = await this.getClient()
        .from('products')
        .select('*')
        .eq('url', slug)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return products.find(p => p.url === slug); // Fallback
    }
  },

  async searchProducts(query, category = null) {
    if (!this.isEnabled()) {
      let results = products;
      if (query) {
        results = results.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      if (category) {
        results = results.filter(p => p.category === category);
      }
      return results;
    }

    try {
      let queryBuilder = this.getClient()
        .from('products')
        .select('*');
      
      if (query) {
        queryBuilder = queryBuilder.ilike('name', `%${query}%`);
      }
      if (category) {
        queryBuilder = queryBuilder.eq('category', category);
      }

      const { data, error } = await queryBuilder.order('name');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching products:', error);
      return this.searchProducts(query, category); // Recursive fallback
    }
  },

  // ============================================
  // USER AUTHENTICATION
  // ============================================

  async signUp(email, password, firstName, lastName) {
    if (!this.isEnabled()) {
      // Local storage fallback
      const users = JSON.parse(sessionStorage.getItem('elora-demo-users') || '[]');
      if (users.some(u => u.email === email)) {
        throw new Error('User already exists');
      }
      users.push({ email, password, firstName, lastName, verified: false });
      sessionStorage.setItem('elora-demo-users', JSON.stringify(users));
      return { user: { email }, needsVerification: true };
    }

    try {
      const { data, error } = await this.getClient().auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) throw error;

      // Save additional user info
      if (data.user) {
        await this.getClient()
          .from('user_profiles')
          .insert({
            user_id: data.user.id,
            email: email,
            first_name: firstName,
            last_name: lastName
          });
      }

      return { user: data.user, needsVerification: true };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  async signIn(email, password) {
    if (!this.isEnabled()) {
      // Local storage fallback
      const users = JSON.parse(sessionStorage.getItem('elora-demo-users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      sessionStorage.setItem('elora-demo-session', JSON.stringify(user));
      return { user };
    }

    try {
      const { data, error } = await this.getClient().auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { user: data.user };
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  async signOut() {
    if (!this.isEnabled()) {
      sessionStorage.removeItem('elora-demo-session');
      return;
    }

    try {
      const { error } = await this.getClient().auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
    }
  },

  async getCurrentUser() {
    if (!this.isEnabled()) {
      const session = sessionStorage.getItem('elora-demo-session');
      return session ? JSON.parse(session) : null;
    }

    try {
      const { data: { user } } = await this.getClient().auth.getUser();
      
      if (!user) return null;

      // Get user profile data
      const { data: profile } = await this.getClient()
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      return {
        ...user,
        firstName: profile?.first_name || '',
        lastName: profile?.last_name || '',
        verified: true
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // ============================================
  // CART
  // ============================================

  async getCart(userId) {
    if (!this.isEnabled()) {
      return JSON.parse(localStorage.getItem('elora-cart-items') || '{}');
    }

    try {
      const { data, error } = await this.getClient()
        .from('carts')
        .select('items')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // Ignore "not found" error
      return data?.items || {};
    } catch (error) {
      console.error('Error fetching cart:', error);
      return {};
    }
  },

  async saveCart(userId, cartItems) {
    if (!this.isEnabled()) {
      localStorage.setItem('elora-cart-items', JSON.stringify(cartItems));
      return;
    }

    try {
      const { error } = await this.getClient()
        .from('carts')
        .upsert({
          user_id: userId,
          items: cartItems,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  },

  async clearCart(userId) {
    if (!this.isEnabled()) {
      localStorage.removeItem('elora-cart-items');
      return;
    }

    try {
      const { error } = await this.getClient()
        .from('carts')
        .delete()
        .eq('user_id', userId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  },

  // ============================================
  // FAVORITES
  // ============================================

  async getFavorites(userId) {
    if (!this.isEnabled()) {
      return JSON.parse(localStorage.getItem('elora-favorites') || '[]');
    }

    try {
      const { data, error } = await this.getClient()
        .from('favorites')
        .select('product_slug')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data.map(f => f.product_slug);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  },

  async addFavorite(userId, productSlug) {
    if (!this.isEnabled()) {
      const favorites = JSON.parse(localStorage.getItem('elora-favorites') || '[]');
      if (!favorites.includes(productSlug)) {
        favorites.push(productSlug);
        localStorage.setItem('elora-favorites', JSON.stringify(favorites));
      }
      return;
    }

    try {
      const { error } = await this.getClient()
        .from('favorites')
        .insert({
          user_id: userId,
          product_slug: productSlug
        });
      
      if (error && error.code !== '23505') throw error; // Ignore duplicate error
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  async removeFavorite(userId, productSlug) {
    if (!this.isEnabled()) {
      const favorites = JSON.parse(localStorage.getItem('elora-favorites') || '[]');
      const filtered = favorites.filter(f => f !== productSlug);
      localStorage.setItem('elora-favorites', JSON.stringify(filtered));
      return;
    }

    try {
      const { error } = await this.getClient()
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('product_slug', productSlug);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  // ============================================
  // ORDERS
  // ============================================

  async createOrder(orderData) {
    if (!this.isEnabled()) {
      const orders = JSON.parse(localStorage.getItem('elora-demo-orders') || '[]');
      orders.push(orderData);
      localStorage.setItem('elora-demo-orders', JSON.stringify(orders));
      return orderData;
    }

    try {
      const { data, error } = await this.getClient()
        .from('orders')
        .insert({
          user_id: orderData.userId,
          reference: orderData.reference,
          items: orderData.items,
          subtotal: orderData.subtotal,
          delivery: orderData.delivery,
          total: orderData.total,
          shipping_address: orderData.shipping,
          payment_method: orderData.payment,
          status: orderData.status || 'pending'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async getOrders(userId) {
    if (!this.isEnabled()) {
      const orders = JSON.parse(localStorage.getItem('elora-demo-orders') || '[]');
      const user = JSON.parse(sessionStorage.getItem('elora-demo-session') || '{}');
      return orders.filter(o => o.userEmail === user.email);
    }

    try {
      const { data, error } = await this.getClient()
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  async getOrder(orderId) {
    if (!this.isEnabled()) {
      const orders = JSON.parse(localStorage.getItem('elora-demo-orders') || '[]');
      return orders.find(o => o.reference === orderId);
    }

    try {
      const { data, error } = await this.getClient()
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  }
};

// Make available globally
window.SupabaseDB = SupabaseDB;
